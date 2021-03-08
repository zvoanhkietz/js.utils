async function sleep(ts: number): Promise<void> {
    await new Promise((rs) => setTimeout(rs, ts));
}

async function promisePool<T>(handler: Function, data: T[], concurency = 10){
    const workers = new Array(concurency)
        .fill(data.entries())
        .map(async (iterator) => {
            for (const [index, item] of iterator) {
                await handler(item, index);
            }
        });
    await Promise.all(workers);
}


// RUN
(async () => {
    const data = [
        "mojombo",
        "defunkt",
        "pjhyett",
        "wycats",
        "ezmobius",
        "ivey",
        "evanphx",
        "vanpelt",
        "wayneeseguin",
        "brynary",
        "kevinclark"
    ];
    const results: {[key:string]:string}[] = [];
    await promisePool(async (item: string, index: number) => {
        console.log(`==>Request[${index}] info of '${item}'`);
        const rand = Math.floor(Math.random() * (3000 - 1000) + 1000);
        await sleep(rand);
        console.log(`<=====Recv[${index}] info of '${item}' in ${rand} ms`);
        results[index] = {name: item, ts: `${rand} ms`};
        return item;
    }, data, 3);
    console.log(results);
})()
