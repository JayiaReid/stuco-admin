export const getUniqueRec = ({attendances}) => {
    const unique = []
    const existingUser = new Set();

    attendances?.forEach(record => {
        if (!existingUser.has(record.stud_ID)) {
            existingUser.add(record.stud_ID)
            unique.push(record)
        }
    });
    return unique;
}