using NewsProject.Common.Entities;
using NewsProject.Repository.Entities;
using NewsProject.Service.Interfaces;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsProject.Service.Algoritim.Interface
{
    public interface IAlgo
    {
        //פונקציה שבונה את טבלת ההסתברות. לכל מילה ברשימת המילים נבדוק את האחוז שהיא נמצאת בכל קטגוריה. העמודה האחרונה היא מס המודעות מכל קטגוריה
        /// <summary>
        /// A function that builds the probability table.
        /// </summary>
        /// <returns> a matrix of the categories and the words in the database.shows the probability for each word to each category. the last column is the number of ads from each category </returns>
        public Task<float[,]> ProbabilityMatrix();

        ////פונקציה המקבלת מילה ומחזירה את המילים הדומות לה עם אחוז הדימיון בינהם באמצעות חיבור לאתר
        /// <summary>
        /// A function that receives a word and returns the similar words with the similarity percent, using Reverso Website
        /// </summary>
        /// <param name="word">a word in the ad</param>
        /// <returns>a dictionary of the similar words and their similarity to the word </returns>
        public Task<Dictionary<string, float>> GetSimilarWordsAsync(string word);

        //פונקציה שמקבלת רשימת מילים ומחזירה מילון של כל מילה עם המילים הדומות לה.באופן אסינכרוני 
        /// <summary>
        /// A function that receives a list of words and returns a dictionary of each word with the words similar to it and their similarity. Asynchronously
        /// </summary>
        /// <param name="words">list of the ad words</param>
        /// <returns>a dictionary of each word with the dictionary of its similar words with the similarity</returns>
        public Task<Dictionary<string, Dictionary<string, float>>> GetAllSimilarWordsAsync(List<string> words);

        //פונקציה המחשבת ממוצע משוכלל לכל המילים הדומות
        /// <summary>
        /// //A function that calculates a refined average for all similar words
        /// </summary>
        /// <param name="similarWords">a dictionary with the similar words and their similarity</param>
        /// <param name="category">the category of the ad's word</param>
        /// <param name="wordCategories">a list of the words for category</param>
        /// <returns></returns>
        public float CheckSimilarWords(Dictionary<string,float> similarWords,Category category,List<WordCategory> wordCategories);

        /// <summary>
        /// A function that get two words and return the similarity percent between them using Cortical Api.
        /// </summary>
        /// <param name="word1">the first word</param>
        /// <param name="word2">the second word</param>
        /// <returns>the similarity between the two words</returns>
        public Task<double?> GetSimilarity(string word1, string word2);

        /// <summary>
        /// A function that get a word in Hebrew and translate it to English using Google Cloud Translation.
        /// </summary>
        /// <param name="heWord">a word in Hebrew</param>
        /// <returns>a string of an English word</returns>
        public Task<string> TranslateWord(string heWord);


        //פונקציה שיוצרת מודעה חדשה ומחזירה התאמה לכל קטגוריה ממוין מהגבוה לנמוך
        /// <summary>
        /// A function that creates a new ad and returns the highest matched of the categories to the ad.
        /// </summary>
        /// <param name="content">a string of the ads' words</param>
        /// <param name="title">a string of the ad's title</param>
        /// <returns>a id of the matched category</returns>
        public Task <int> DefineCategory(string content,string title);

        //פונקציה שמפרידה את המחרוזת למילים 
        /// <summary>
        /// A function that separates the string into words
        /// </summary>
        /// <param name="content">a string</param>
        /// <returns>list of words</returns>
        public List<string> ParseToWords(string content);

        //פונקציה שמקבלת רשימת מילים ומורידה ממנה את המילים הלא משמעותיות
        /// <summary>
        /// A function that receives a list of words and removes the meaningless words from it
        /// </summary>
        /// <param name="words">a list of words</param>
        /// <returns>a list of the impact words</returns>
        public List<string> impactWords(List<string> words);


        /// <summary>
        /// A function that gets the content of the ads and insert the words to the Words and WordsCategory table according to the category.
        /// </summary>
        /// <param name="content">a string of the content</param>
        /// <param name="category">number of a category</param>
        /// <returns>void</returns>
        public Task InsertInformationToData(string content,int category);
    }
}
