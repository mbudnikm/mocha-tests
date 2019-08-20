const unique = (collection, uniqueAttr) => {
    if(!uniqueAttr){
        return Array.from(new Set(collection))
    }
    
    const set = new Set()
    const result = []
    collection.forEach(item => {
        if (!set.has(item[uniqueAttr])) {
            set.add(item[uniqueAttr])
            result.push(item)
        }
    })
    return result
};

module.exports = {
    unique
}