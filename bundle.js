const [path, ...options] = Bun.argv.slice(2);

const filename = path.split('/').pop();
const id = filename.replace(/\.(js|ts)$/, "");

const build = await Bun.build({
    entrypoints: [
        path.includes("src/") ? path :
            "src/" + filename
    ],
    outdir: './dist',
    minify: options.includes("--minify"),
});

if (!build.success) {
    console.error(id, "build failed.\n", error);
    process.exit(1);
}

console.log(
    "\njs successfully built at:",
    "\n  ./dist/" + id + ".js"
);

if (!options.includes("--html"))
    process.exit(0);

await Bun.write(`./dist/${id}.html`, `\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${id.replace(/(\.|-|_)/g, " ")}</title>
</head>
<body><script src="${id}.js"></script></body>
</html>
`);

console.log(
    "\nhtml successfully built at:",
    "\n  ./dist/" + id + ".html"
);
