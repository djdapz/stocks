#!/usr/bin/env bash

rm stocks

set -e

touch stocks
echo "#!/usr/bin/env node" > stocks
chmod +x stocksn
./node_modules/rollup/bin/rollup  --config rollup.config.js --format cjs >> stocks