import { toast } from "sonner";


export const getHex3Digit = (hex:string):string =>{
   // console.log(hex)
    const parsedHex = hex.replace("#","");
    const bigint = parseInt(parsedHex,16);
    const r= (bigint >>16) & 255;
    const g = (bigint >>8) & 255;
    const b = (bigint) & 255;
    const rgb = (r + ", " + g + ", " + b)
    return convertFromRGB(rgb);
}

const convertFromRGB = (rgb:string):string=>{
    const colors = rgb.split(",")
    const red = parseInt(colors[0].replace(/[^\d.]/g, '' ));
	const green = parseInt(colors[1].replace(/[^\d.]/g, '' ));
	const blue = parseInt(colors[2].replace(/[^\d.]/g, '' ));
    const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd' ,'e', 'f'];
	const code = hex[Math.floor(red/16)] + hex[Math.floor(green/16)] + hex[Math.floor(blue/16)];
    //console.log(code)
    return code;
}

/* takes the singular string of 3digit hex codes (separated by \n) and converts it into
the 2d 'grid' array of 6 digit hex codes */
export const getBitMapArray = (bmemstring:string):[string[][], number]=>{
    const array_6digit:string[] = new Array(256).fill("");
    const rettest:string[][] = Array.from({ length: 16 }, () =>
        Array.from({ length: 16 }, () => "")
      );
    const hexcodes = bmemstring.split("\n");
    if( hexcodes.length != 256){
        toast("Invalid number of lines. Found " + hexcodes.length + ", expected 256",{className:"!border-destructive !bg-destructive"});
        return [rettest,0];
    }
    for (let i=0;i<hexcodes.length;i++){
        let hexcode = "#";
        if (hexcodes[i].length != 3){
            toast("Invalid hexcode at line " + (i+1),{className:"!border-destructive !bg-destructive"});
            return [rettest, 0];
        }
        for(let j=0; j<3;j++){
            hexcode+=hexcodes[i][j]
            hexcode+=hexcodes[i][j]
        }
      //  console.log(hexcode)
        array_6digit[i] = hexcode;
    }
    const ret = convert6DigitBitMapToArray(array_6digit);
    //now have to turn it back into array. so first 
    return [ret,1];
}
export const convert6DigitBitMapToArray = (bitmap:string[]):string[][]=>{
    const test:string[][] = Array.from({ length: 16 }, () =>
        Array.from({ length: 16 }, () => "j")
      );
    let i = 0;
    while(i != 16){
        for(let j=0; j<16;j++){
            const offset = (i*16)+j
            test[i][j] = bitmap[offset]           //test[0][0],test[0][1]..
        }
        i++
    }
    
   //console.log(test)
    return test;
}
export const convertArrayto6DigitBitMap = (array:string[][]):string[] =>{
    const ans:string[] = [];
    for(let i=0; i<16;i++){
        for(let j=0;j<16;j++){
            ans.push(array[i][j])
        }
    }
    return ans;
}

