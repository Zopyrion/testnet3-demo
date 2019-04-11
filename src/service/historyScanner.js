exports.build = function(data) {
    const res = {};

    let inputs = [];
    let outputs = [];
    const txrefs = data["txrefs"];
    let currentHash = "";
    let val = 0;
    for (let key in txrefs) {
        if (txrefs.hasOwnProperty(key)) {
            const hash = txrefs[key]['tx_hash'];
            const input = txrefs[key]['tx_input_n'];
            const output = txrefs[key]['tx_output_n'];
            const value = txrefs[key]['value'];
            if(currentHash !== hash){
                if(val > 0){
                    inputs.push(val);
                } else{
                    outputs.push(val);
                }
                val = 0;
                currentHash = hash;
            }
            if(input < 0){
                val += value;
            } else if(output < 0){
                val -= value;
            }
        }
    }
    if(val > 0){
        inputs.push(val);
    } else{
        outputs.push(val);
    }
    let len = new Array(Math.max(inputs.length, outputs.length)).fill('tx');
    outputs.reverse();
    inputs.reverse();

    res['outputs'] = outputs;
    res['inputs'] = inputs;
    res['len'] = len;

    return res;
};