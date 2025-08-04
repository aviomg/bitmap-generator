import React, { act } from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Pipette, Router } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { getHex3Digit, getBitMapArray, convertArrayto6DigitBitMap, convert6DigitBitMapToArray} from "@/utils/canvas_calculations";
import { Toggle } from "./ui/toggle";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { useRouter } from "next/router";

export type Sprite = {
  id:string,
  index:number,
  name:string,
  grid:string[][],
  savedAt:string
}
export const generateUniqueId = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
type CanvasProps = {
  initialGrid?: string[][];
  onGridChange?: (newGrid: string[][]) => void;
  editpage:boolean;
  sprite?:Sprite;
};
export function Canvas({ initialGrid, onGridChange,editpage,sprite }: CanvasProps){
    const router = useRouter();
    let initial_bitmaparr:string[] = new Array(256).fill("fff");  
    const [hist,setHist] = useState<string[][]>([])
    const [isDown, setIsDown] = useState(false);
    const [activeColor, setActiveColor] = useState<string>("#ffffff");
    const [selecting, setSelecting] = useState<boolean>(false);
    const [textarr, setTextArr] = useState<string>("");
    const [bitmaparr, setBitMapArr] = useState<string[]>(initial_bitmaparr);
    const[idstr,setIdStr] = useState<string|null>("");
    const[currSprite,setCurrSprite] = useState<Sprite|null>(sprite || null);
    const gridSize = 16;
    const [grid, setGrid] = useState<string[][]>(  initialGrid || 
        Array.from({ length: gridSize }, () =>
          Array.from({ length: gridSize }, () => activeColor)
        )
      );
     // Add a global mouseup listener to reset isDown
     useEffect(() => {
      if (onGridChange) onGridChange(grid);
    }, [grid]);
     useEffect(() => {
      const saved = localStorage.getItem("pixelGrid");
      const savedcol = localStorage.getItem("activeColor");
      if (saved) {
        setGrid(JSON.parse(saved));
      
      }
      if(savedcol){
        setActiveColor(JSON.parse(savedcol))
      }
    }, []);
    
    useEffect(() => {
      localStorage.setItem("pixelGrid", JSON.stringify(grid));
      localStorage.setItem("activeColor",JSON.stringify(activeColor))
    }, [grid,activeColor]);

    useEffect(() => {
        const handleMouseUp = () => {
          setIsDown(false);
        }
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
          window.removeEventListener("mouseup", handleMouseUp);
        };
      }, []);
      const saveSprite = () => {
        const savedSpritesKey = "savedSprites";
      
        // Load existing sprites (or start fresh)
        const existing = JSON.parse(localStorage.getItem(savedSpritesKey) || "[]");
      
        // Create a new entry
        const newEntry:Sprite = {
          id: generateUniqueId(), // unique ID based on timestamp
          index:existing.length+1,
          name: `Sprite ${existing.length + 1}`,
          grid: grid, // your current grid state
          savedAt: new Date().toISOString(),
        };
      
        // Save back to localStorage
        localStorage.setItem(savedSpritesKey, JSON.stringify([...existing, newEntry]));
      
       
        
          toast("Sprite saved!", {
      
            action: {
              label: "View",
              onClick: () => router.push("/sprites"),
            },
            classNames: {
              toast: "!flex !items-center !group !relative !justify-between !gap-4 !rounded-md !border !border-primary !shadow-none !bg-transparent !p-4 ",
              title: "!font-semibold !text-sm",
              actionButton:
                "!border !border-primary !bg-ring  !group-hover:bg-secondary !px-10 !py-1 !text-sm !font-medium !hover:bg-accent !hover:text-accent-foreground !rounded-md",
        
            },
          })
        
      };

      /*useEffect(()=>{
        const idstr = localStorage.getItem("selectedSpriteId");
        console.log("idstr is " + idstr);
        if(idstr){
          //find the current sprite in the storage:
          //const id = parseInt(idstr);
          const all = JSON.parse(localStorage.getItem("savedSprites") || "[]");
          const found = all.find((sprite:any)=>sprite.id==idstr);
          setIdStr(idstr);
          if(found){
            setGrid(found.grid);
            setCurrSprite(found);
          }
          setTimeout(() => {
            localStorage.removeItem("selectedSpriteId");
          }, 100);
        
         // localStorage.removeItem("selectedSpriteId");
        }
      }, []);*/
      const updateTile = (i: number, j: number) => {
        setGrid((prev) => {
          const newGrid = prev.map((row) => [...row]);
          newGrid[i][j] = activeColor;
          return newGrid;
        });};

      const handleMouseDown  = (row:number, col:number) =>{
        setIsDown(true);
        if(selecting){
          const color = grid[row][col]
          console.log(color);
          setActiveColor(color);
          setSelecting(false);
          return
        }
        const old = convertArrayto6DigitBitMap(grid);
        setHist([...hist,old])
       //hist.push(old);
        if(hist.length>20){
          const newhist = hist.map((row)=>[...row]);
          newhist[0].shift();
          setHist(newhist)
        }
        console.log(hist)
        updateTile(row,col);
      }

      const loadSprite = (bmemstring:string) => {
        //get the text area stuff and convert it back..lol
        //bmemstring = the long string of 3digit hex codes separated by \n
        if(!bmemstring){return}
        const [bmemarr,err] = getBitMapArray(bmemstring);
        if(err==0) return;
        console.log(bmemarr);
        setGrid(bmemarr);
       

      }

      const updateSprite = () =>{
        if(currSprite){
          const updated_sprite: Sprite = {
            id:currSprite.id,
            index:currSprite.index,
            name:currSprite.name,
            grid:grid,
            savedAt:new Date().toISOString()
          }
        setCurrSprite(updated_sprite)
        const all = JSON.parse(localStorage.getItem("savedSprites") || "[]");
        const updatedsprites = all.map((sprite:Sprite)=>
          sprite.id == currSprite.id? {...sprite,grid}:sprite
          );
        localStorage.setItem("savedSprites", JSON.stringify(updatedsprites));
        console.log(JSON.parse(localStorage.getItem("savedSprites")||"[]"))
      //  console.log(currSprite.grid);
      //  console.log(grid)
        toast("Sprite #" + currSprite.index + " updated!")
      }
      else{console.log("none")}
      }

    const generateHexcodes = ():string[] => {
        const flatHexes = grid.flat();
        //console.log(flatHexes);
        let newbitmaparr:string[] = new Array(256).fill("");
        let i:number = 0
        for (i=0;i<256;i++){
          const dig3 = getHex3Digit(flatHexes[i]);
          newbitmaparr[i] = dig3;
        }
        setBitMapArr(newbitmaparr);
       return newbitmaparr;
      };
    const fillBoard = (color:string) =>{
        const newGrid = Array.from({length:gridSize},()=>
            Array.from({length:gridSize},()=>color)
        );
        const old = convertArrayto6DigitBitMap(grid);
        setHist([...hist,old])
        if(hist.length>20){
          const newhist = hist.map((row)=>[...row]);
          newhist[0].shift();
          setHist(newhist)
        }
     //   console.log(hist)
        setGrid(newGrid);

    }
    const Undo = () =>{
        console.log(hist);
        if(hist.length ==0){return;}
        const lastrow = hist[hist.length-1]
        const newhist = hist.slice(0,-1)
        setHist(newhist);
        const oldgrid = convert6DigitBitMapToArray(lastrow)
     //   const oldgrid = convert6DigitBitMapToArray(hist.pop())
        setGrid(oldgrid);
    }
   

    return(
        <div className="mx-auto text-center p-0 flex flex-col gap-y-2 ">
          {currSprite && editpage?
          <Badge variant="secondary" className="text-md border-muted border text-primary-foreground font-bold my-1 mx-auto">
            Modifying: Sprite #{currSprite.index}
          </Badge>:
          <Badge variant="secondary" className=" text-md my-1 mx-auto text-primary-foreground  border font-bold border-muted">
            New Sprite
          </Badge>
}
        <div className="mx-auto mb-2">
        {grid.map((row, i) => (
          <div key={i} className="flex flex-row mx-auto">
            {row.map((color, j) => (
              <div
                key={j}
                className="w-[28px] h-[28px] border border-black"
                style={{ backgroundColor: color }}
                onMouseDown={() => {handleMouseDown(i,j);}}
                onMouseEnter={()=>{if(isDown){updateTile(i,j);}}}
              />
            ))}
          </div>
        ))}
          </div>
          <div className="flex flex-row gap-x-8 justify-center">
              <Button  size="sm" onClick={Undo} className=" mb-2" >Undo</Button>
              <Button  size="sm" onClick={()=>{fillBoard("#ffffff")}} className=" mb-2" >Clear</Button>
              </div>
          <div className="flex flex-row gap-x-8 justify-center mb-4">
            {currSprite && editpage?
            <Button variant="secondary" onClick={updateSprite}>Update Sprite #{currSprite.index}</Button>:
            <Button variant="secondary" onClick={saveSprite}>Add to Saved Sprites</Button>
            }
              {currSprite && editpage?
              <>
              <Button onClick={()=>{
                setGrid(currSprite.grid)
              }} variant="secondary">Revert Changes</Button>
              <Button variant="secondary" onClick={()=>{setCurrSprite(null);fillBoard("#ffffff"); }}>New Sprite</Button> </>:null
              }
              </div>


              
			Just click on the board to color it with with whatever color is currently selected
			<div className="flex flex-row gap-x-6 justify-center mb-4">
                <div className="flex flex-row gap-x-1 items-center">
				<Label htmlFor="color-pick" >Select Color</Label>
        <Toggle aria-label="Toggle italic" pressed={selecting} onPressedChange={()=>{setSelecting(!selecting)}}>
        <Pipette  className="text-primary" />
    </Toggle>
                </div>
                <Input className="w-16 p-0.5" type="color" id="colorizer" value={activeColor} onChange={(e)=>{setActiveColor(e.target.value)}} />
				<Button onClick={()=>{fillBoard(activeColor)}} size="sm">Color Entire Board</Button>
			</div>
            <div className="flex flex-row gap-x-4 justify-center w-full">
                <div className="flex flex-col w-25">
                <Textarea className="w-full !font-mono py-0.5 !text-accent-foreground h-38 mx-auto border-secondary" id = "bitmap" value={textarr} 
                onChange={(e)=>{setTextArr(e.target.value)}} ></Textarea>
			 
                </div>
                <div className="flex flex-col gap-y-2">
                <Button variant="outline" 
                onClick={()=>{const newbitmaparr = generateHexcodes();
                  setTextArr(newbitmaparr.join("\n"));
                }}>Generate hexcodes</Button>
                <Button variant="outline" onClick={()=>{
                  navigator.clipboard.writeText(textarr);
                  toast("hexcodes copied!")
                }} >Copy to Clipboard</Button>
                <Button variant="outline" onClick={()=>{loadSprite(textarr)}} >Load from Text Area</Button>
                <Button variant="outline" onClick={()=>{setTextArr("")}} >Clear Text Area</Button>
              

                </div>
                
               
            </div>
			
			
          
    
      </div>
  
    )

}
//STEPS:
// 1. get the 6-digit hext color code
//2. use the rgb formula to convert it into r,g,b
//3. pass this into the spritemaker function
/*
     <div className="overflow-auto mx-auto ml-10">
            {[...Array(gridsize)].map((_, rowIndex) => (
                <div key={rowIndex} className="ml-5 flex flex-row mx-auto overflow-auto">
                      {[...Array(gridsize)].map((_, colIndex) => {
                         return(
                         <div key={colIndex} 
                         className=" w-[28px] h-[28px] border" onMouseDown={()=>handleMouseDown(rowIndex,colIndex)} />) 
})}
                    </div>
            ))}
        {isDown? <Button onClick={generateHexcodes}>{currcolor}</Button>:null}
        </div>

*/
