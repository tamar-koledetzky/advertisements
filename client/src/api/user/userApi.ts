export function isValidPhoneNumber(phoneNumber:string) {
    const phoneRegex = /^\d{10}$/; // תבנית עבור מספר טלפון בפורמט אמריקאי בעל 10 ספרות בלבד
    return phoneRegex.test(phoneNumber);
}
 
export function isValidID(id:string) {
    const idRegex = /^\d{9}$/; // תבנית עבור תעודת זהות ישראלית בעלת 9 ספרות בלבד
    return idRegex.test(id);
}

export function isValidEmail(email:string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // תבנית עבור אימייל תקין
    return emailRegex.test(email);
}

export function isValidPassword(password:string, verify:string)
{
    return password===verify
}