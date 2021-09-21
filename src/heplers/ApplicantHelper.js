export const getTreeArray = (data) => {
    // console.log({ data })
    let array = []
    for (const [key, value] of Object.entries(data)) {
        const separated = key.replace(/([A-Z])/g, ' $1').trim()
        const capitalized = separated.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
        let valueArray = []
        if (value) {
            if (typeof value === 'object') {
                // console.log({ subValue })
                // const arr = 
                // console.log({ value })
                // console.log({ value })
                valueArray.push(getTreeArray(value))
                // console.log({ arr })
            } else {
                // console.log({ value })
                valueArray.push(value)
            }
        }
        const data = {
            key: capitalized,
            value: valueArray
        }
        array.push(data)
    }
    return array
}

export const treeHelper = (data) => {
    let array = []

}