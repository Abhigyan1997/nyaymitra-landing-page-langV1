export function getUser() {
    const profileString = localStorage.getItem("userProfile");
    if (!profileString) throw new Error("User not logged in");

    try {
        const profile = JSON.parse(profileString);
        return {
            id: profile.id,                // MongoDB _id
            userId: profile.userId,        // custom unique ID
            email: profile.email,
            name: profile.fullName,
            phone: profile.phone,
        };
    } catch (err) {
        throw new Error("Invalid user profile");
    }
}