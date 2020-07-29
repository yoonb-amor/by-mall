const fs = require('fs-extra');
const path = require('path');
const deployTasks = require('./deploy.config.js');

// 将前端产物“搬运”到指定目录

const promisedDeployTasks = deployTasks.map(deployTask => {
    const { source, target, replace } = deployTask;
    return new Promise(async (resolve, reject) => {
        if (!source || !target) {
            return reject(new Error('必须指定 ${source} 和 ${target} !'));
        };
        console.log(`${source} -> ${target}`);
        try {
            const stat = await fs.lstat(source);
            if (replace && stat.isFile()) {
                let content = await fs.readFile(source, 'utf-8');
                replace.forEach(item => {
                    content = content.replace(item.pattern, item.replacement);
                });
                await fs.outputFile(target, content);
            } else {
                await fs.copy(path.resolve(__dirname, source), path.resolve(__dirname, target));
            };
            resolve();
        } catch (e) {
            reject(e);
        }
    });
});

Promise.all(promisedDeployTasks).then(() => {
    console.log('部署完成!');
}).catch(e => {
    console.log(e);
    console.log('部署失败!');
})
