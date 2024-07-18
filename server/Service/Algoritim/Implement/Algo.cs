using AutoMapper;
using NewsProject.Common.Entities;
using NewsProject.Repository.Entities;
using NewsProject.Repository.Interfaces;
using NewsProject.Service.Interfaces;
using NewsProject.Service.Algoritim.Interface;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Service.Interfaces;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using NewsProject.Service.Algoritim.ResponseData;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Translation.V2;
using System.Xml;
using System;
using HtmlAgilityPack;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.EntityFrameworkCore;

namespace NewsProject.Service.Algoritim.Implement
{
    public class Algo : IAlgo
    {
        private IAdService adService;
        private readonly IRepository<Category> repositoryCategory;
        private readonly IRepository<WordCategory> repositoryWordCategory;
        private readonly IRepository<Word> repositoryWord;
        List<Word> dbWords;
        List<WordCategory> wordCategories;
        List<Category> categories;
        public Algo(IAdService adService,IRepository<Category> repositoryCategory, IRepository<WordCategory> repositoryWordCategory, IRepository<Word> repositoryWord) 
        {
            this.adService=adService;
            this.repositoryCategory=repositoryCategory;
            this.repositoryWordCategory=repositoryWordCategory;
            this.repositoryWord=repositoryWord;
        }
        public float CheckSimilarWords(Dictionary<string, float> similarWords, Category category,List<WordCategory> wordCategories)
        {
            float avg = 0,sum=0;
            foreach(var item in similarWords)
            {
              //check if the similar word is in the WordCategory table in this category
              WordCategory c1 = wordCategories.FirstOrDefault(c => c.Category == category && c.Word.word==item.Key);
              if(c1!= null)
                {
                    float c=(float)c1.Weight/(float)category.Ads.Count;//the weight of the similar word
                    avg += c * item.Value;//calc the real weight of the similar words for average: (weight* similarity)
                }
                sum += item.Value;//the sum of weights of the similar words
            }
            return avg/sum;
        }

        public async Task<Dictionary<string, Dictionary<string, float>>> GetAllSimilarWordsAsync(List<string> words)
        {
            Dictionary<string, Dictionary<string, float>> allSimilarWords = new Dictionary<string, Dictionary<string, float>>();
            List<Task> tasks = new List<Task>();

            foreach (string word in words)
            {
                try
                {
                    Task<Dictionary<string, float>> task = GetSimilarWordsAsync(word);
                    //adding a task to the list of tasks: get similar words and similarity for a word
                    tasks.Add(task);

                    //adding result to the dictionary
                    allSimilarWords[word] = await task;
                }

                catch (Exception ex) {
                    allSimilarWords[word] =null;
                }
            }
            //waiting for all tasks to return values.
            await Task.WhenAll(tasks);
            return allSimilarWords;
        }

        public async Task<Dictionary<string, float>> GetSimilarWordsAsync(string word)
        {
            Dictionary<string, float> similarWords = new Dictionary<string, float>();
            string url = $"https://synonyms.reverso.net/%D7%9E%D7%9C%D7%99%D7%9D-%D7%A0%D7%A8%D7%93%D7%A4%D7%95%D7%AA/he/{word}";
            HttpClient client = new HttpClient();
            try
            {
                //sending a Get request
                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();

                //reading response body
                string responseBody = await response.Content.ReadAsStringAsync();

                // output content by HtmlAgilityPack
                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml(responseBody);
                //searching for the label that contains the list of the similar words.
                HtmlNode similars = doc.DocumentNode.SelectSingleNode("//ul[@class='word-box']");
                string translatedWord = await TranslateWord(word);
                if (similars != null)
                {
                    HtmlNodeCollection words = similars.SelectNodes(".//a[contains(@class, 'synonym')and contains(@class, 'relevant')]"); // החיפוש שלך על פי Id
                    if (words != null) {
                        foreach (HtmlNode node in words)
                        {
                            string text = node.InnerText;
                            string translatedText = await TranslateWord(text);
                            try
                            {
                                double similarity= (double)await GetSimilarity(translatedWord, translatedText);
                                similarWords.Add(text, (float)similarity);
                            }
                            catch(Exception ex)
                            {

                            }
                        }
                    }
                }
            }

            catch (HttpRequestException ex)
            {
                throw ex;
            }

            return similarWords;
        }

        public async Task<double?> GetSimilarity(string word1, string word2)
        {
            string token = "eyJvcmciOiI2NTNiOTllNjEzOGM3YzAwMDE2MDM5NTEiLCJpZCI6IjEwM2M4YzhhZTYwMjQ4MGE5NGY1ZDc5MzA3ZWJiMjViIiwiaCI6Im11cm11cjEyOCJ9";
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://gw.cortical.io/nlp/compare"),
                Headers =
    {
        { "Accept", "application/json" },
        { "Authorization", $"Bearer {token}" },
    },
                Content = new StringContent($"[\n  {{\n    \"text\": \"{word1}\",\n    \"language\": \"en\"\n  }},\n  {{\n    \"text\": \"{word2}\",\n    \"language\": \"en\"\n  }}\n]")
                {
                    Headers =
        {
            ContentType = new MediaTypeHeaderValue("application/json")
        }
                }
            };
            try
            {
                var response = await client.SendAsync(request) as HttpResponseMessage;
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                Console.WriteLine(body);
                var responseData = JsonConvert.DeserializeObject<ComparisonResult>(body);
                return responseData.Similarity;
            }
            catch (HttpRequestException ex)
            {
                return null;
            }
        }
        public async Task<string> TranslateWord(string heWord)
        {
            string apiKey = "AIzaSyAjx3NiyRxd-uhlHAAdgTS5cgFx-YydQ20"; 
            TranslationClientBuilder builder = new TranslationClientBuilder
            {
                ApiKey = apiKey
            };
            TranslationClient client = await builder.BuildAsync();
            try
            {
                var result = await client.TranslateTextAsync(heWord, "en");
                return result.TranslatedText;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        public List<string> impactWords(List<string> words)
        {
            List<string> notimpo= new List<string>() { "אני", "אתה", "הוא.", "אתם", "אתן", "אנחנו", "הם", "עכשיו", "רגע", "שלכם", "שלכן", "טוב", "מחר", "בשבילך", "בשבילכם", "גדול","קטן" };

            foreach(var w in notimpo) 
            {
                words.Remove(w);
            }
            return words;
        }

        public async Task<int> DefineCategory(string content,string title)
        {
            dbWords = await repositoryWord.getAllAsync();
            wordCategories = await repositoryWordCategory.getAllAsync();
            categories = await repositoryCategory.getAllAsync();
            List<string> adWords = ParseToWords(content);
            List<string> titleWords= ParseToWords(title);
            foreach(var t in titleWords)
            {
                adWords.Add(t);
            }
                
            Dictionary<string, Dictionary<string, float>> similarWords = await GetAllSimilarWordsAsync(adWords);
            List<string> allwords = dbWords.Select(w => w.word).ToList();
            float[,] probability = await ProbabilityMatrix();
            //building the ad statistics array for each category
            double[] statics = new double[categories.Count];
            //The initialization of the array with the count ads for each category
            for (int i = 0; i < categories.Count; i++)
            {
                statics[i] = probability[i,dbWords.Count];
            }
            foreach (var word in adWords)
            {
                int flag = -1;
                float statt = 0, w = 0;
                //If the word exists in the words table we will find its place in the probability table.
                if (dbWords.Any(w => w.word == word))
                {
                    int index = allwords.IndexOf(word);
                    flag = index;
                }
                for (int i = 0; i < categories.Count; i++)
                {
                    //if the word exists in the words table
                    if (flag >= 0)
                        statt = probability[i, flag];
                    //if the word doent exists, check its similar words
                    if (statt == 0 && similarWords[word]!=null)
                        w = CheckSimilarWords(similarWords[word], categories[i], wordCategories);
                    //if the percent of the word in this category is very small, put a fixed small percent:0.0001
                    statics[i] *= statt > 0 ? statt : w > 0 ? w : 0.0001;
                }
            }
            Dictionary<int, double> result = new Dictionary<int, double>();
            for (int i = 0; i < categories.Count; i++)
            {
                result.Add(categories[i].Id, statics[i]);
            }
            //sort the results dictionary from the high percent to the low
            result = result.OrderBy(x => x.Value).Reverse().ToDictionary(x => x.Key, x => x.Value);

            return result.First().Key;
        }
        public List<string> ParseToWords(string content)
        {
            char[] whitespace = new char[] { ' ', '\t', '\n', '\r' };
            List<string> words=content.Split(whitespace).ToList();
            List<string> newWords = new List<string>();
            foreach (var w in words)
            {
                var word = Regex.Replace(w, @"[\d-]", string.Empty);//מוריד את המספרים והקו המפריד "-" במחרוזת
                new List<string> { "@", ",", ".", ";", "`", "+", "-", "*", "=", "(", ")", "\"", "!", "?", "/", ":" }.ForEach(m => word = word.Replace(m, ""));
                if (word.Length > 1)
                {
                    newWords.Add(word);
                }
            }
            newWords=impactWords(newWords);
            return newWords;
        }

        public async Task<float[,]> ProbabilityMatrix()
        {
            dbWords = await repositoryWord.getAllAsync();
            wordCategories = await repositoryWordCategory.getAllAsync();
            categories = await repositoryCategory.getAllAsync();
            Category[] c = categories.ToArray();
            WordCategory[] wc = wordCategories.ToArray();
            float[,] probMat=new float[categories.Count, dbWords.Count+1];
            //Fills the last place in the table with the number of ads in each category
            for(int i= 0;i<categories.Count;i++)
            {
                List<AdDto> a = await adService.GetByCategory(c[i].Id);
                probMat[i, dbWords.Count] = a.Count;
            }
            //fills the probability matrix: for each word for category we calc the probability this way: weight/num of ads from this category
            for (int i=0;i<wordCategories.Count;i++)
            {
                int indexW = dbWords.IndexOf(wc[i].Word);
                int indexC = categories.IndexOf(wc[i].Category);
                probMat[indexC,indexW]= (float)(wc[i].Weight / probMat[indexC, dbWords.Count]);
            }
            return probMat;
        }

        public async Task InsertInformationToData(string content, int category)
        {
            dbWords = await repositoryWord.getAllAsync();
            wordCategories = await repositoryWordCategory.getAllAsync();
            categories = await repositoryCategory.getAllAsync();
            List<string> adWords = ParseToWords(content);
            foreach (string item in adWords)
            {
                //searching the word in the Words table
                Word w = dbWords.FirstOrDefault(w1 => w1.word == item);
                if (w == null)
                {
                    //if the word is not found we create a new one and add to our database. 
                    w = new Word(item);
                    await repositoryWord.AddItem(w);
                }
                WordCategory wc = wordCategories.FirstOrDefault(wc1 => wc1.Word.word == item && wc1.CategoryId == category);
                //searching the word in it's category in the WordCategory table 
                if (wc == null)
                {
                    wc = new WordCategory(category, w.Id);
                    await repositoryWordCategory.AddItem(wc);
                }
                //if the word in the category is exist, we raise the weight and update the database
                else
                {
                    wc.Weight++;
                    await repositoryWordCategory.UpdateItem(wc, wc.Id);
                }
            }
        }
    }
}
