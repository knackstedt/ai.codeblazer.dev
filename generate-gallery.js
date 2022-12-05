const fs = require('fs-extra');

(async() => {
    const contents = await fs.readdir("src/assets/ai/");
    let data = await Promise.all(contents
        .map(async d => {
            // Digital_Glitch_node_network_d6ced5d4-64d0-47a8-ad77-e7d17ef6f4f7
            let items = await fs.readdir("src/assets/ai/" + d + "/");

            let f = items.map(i => {
                let prompt =
                    i.replace("Digital_Glitch_", '')
                     .replace(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\.[A-Za-z0-9]+?$/, '')
                     .replace(/_/g, ' ');

                return {
                    url: "assets/ai/" + d + "/" + i,
                    prompt
                }
            });
            return {
                group: d,
                items: f
            };
        }));

    await fs.outputJson("src/app/ai-images.json", data);
})()
