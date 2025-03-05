export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    } else {
        return true;
    }
}

export const validateDate = (date: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) {
        return false;
    } else {
        if (date === '' || date === null) {
            return false;
        } else if (date <= '1910-01-01') {
            return false;
        } else if (date >= '2030-01-01') {
            return false;
        } else {
            return true;
        }
    }
}