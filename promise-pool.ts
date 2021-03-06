async function sleep(ts: number): Promise<void> {
    await new Promise((rs) => setTimeout(rs, ts));
}

async function promisePool<T>(handler: Function, data: T[], concurency = 10): Promise<T[]> {
    const results: T[] = [];
    const workers = new Array(concurency)
        .fill(data.entries())
        .map(async (iterator) => {
            for (const [index, item] of iterator) {
                console.log(`==>Request[${index}] info of '${item}'`);
                results.push(await handler(item));
                console.log(`<=====Recv[${index}] info of '${item}'`);
            }
        });
    await Promise.all(workers);
    return results;
}


// RUN
(async () => {
    const data = ["mojombo", "defunkt", "pjhyett", "wycats", "ezmobius", "ivey", "evanphx", "vanpelt", "wayneeseguin", "brynary", "kevinclark"];
    const results = await promisePool(async (item: string) => {
        const rand = Math.floor(Math.random() * (3000 - 1000) + 1000);
        await sleep(rand);
        console.log(`Waiting response from item '${item}'...${rand}s`);
        return item;
    }, data, 3);
    console.log(results);
})()
