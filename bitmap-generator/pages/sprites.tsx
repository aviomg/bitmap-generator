import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Plus, X, XIcon } from "lucide-react";
import { Card, CardContent,CardDescription, CardTitle, CardHeader } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea";
import { getBitMapArray, getHex3Digit } from "@/utils/canvas_calculations";
import { generateUniqueId, Sprite } from "@/components/canvas";
import { toast } from "sonner";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
  } from '@dnd-kit/core';
  import {
    SortableContext,
    arrayMove,
    horizontalListSortingStrategy,
    useSortable,
    verticalListSortingStrategy,
  } from '@dnd-kit/sortable';
  import { CSS } from '@dnd-kit/utilities';

export default function SavedSpritesPage() {
  const [sprites, setSprites] = useState<Sprite[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [genisopen, setGenIsOpen] = useState<boolean>(false);
  const [clearisopen, setClearIsOpen] = useState<boolean>(false);
  const [bmem, setBmem] = useState<string>("");
  const [reorderMode, setReorderMode] = useState(false);
  const[textarr,setTextArr] = useState<string>("");
  const router = useRouter();
  const sensors = useSensors(useSensor(PointerSensor));


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedSprites") || "[]");
    setSprites(saved);
    }, []);

  const loadBmem = ()=>{
    const lines = textarr.split('\n')
    const parts:string[] = [];
    for(let i=0;i<lines.length;i+=256){
        const chunk = lines.slice(i, i+256);
        parts.push(chunk.join('\n'))
    }
    localStorage.setItem("savedSprites","[]");
    for(let i=0;i<parts.length;i++){
        const [arr,err] = getBitMapArray(parts[i]);
        if(err == 0){
            console.log("error")
            return;
        }
        saveSprite(arr,i);
    }
    const newsprites = JSON.parse(localStorage.getItem("savedSprites") || "[]");
    setSprites(newsprites);
}
    //getBitMapArray takes the 256-line (not split by \n yet) string of 3-digit hex codes and turns it into the grid
  const generateBmem = () =>{
    //for each sprite, get the grid. turn it into 3 digit hexcode separated by \n. concatenate all of them
    const dig3hexes = []
    for (const spr of sprites){
        const grid = spr.grid;
        const flatHexes = grid.flat();
        let newbitmaparr:string[] = new Array(256).fill("");
        let i:number = 0
        for (i=0;i<256;i++){
          const dig3 = getHex3Digit(flatHexes[i]);
          newbitmaparr[i] = dig3;
        }

        dig3hexes.push(newbitmaparr.join("\n"));
    }
    const ans = dig3hexes.join("\n");
    setBmem(ans);
    setGenIsOpen(true);
  }

  const saveSprite = (grid:string[][], index:number) => {
    const savedSpritesKey = "savedSprites";
    // Load existing sprites (or start fresh)
    const existing = JSON.parse(localStorage.getItem(savedSpritesKey) || "[]");
    // Create a new entry
    const newEntry:Sprite = {
      id: generateUniqueId(), // unique ID based on timestamp
      index:index,
      name: `Sprite ${index}`,
      grid: grid, // your current grid state
      savedAt: new Date().toISOString(),
    };
    // Save back to localStorage
    localStorage.setItem(savedSpritesKey, JSON.stringify([...existing, newEntry])); 
    };

    const deleteSprite = (id:string) =>{
        const savedSprites = JSON.parse(localStorage.getItem("savedSprites") || "[]");
        const updatedSprites = savedSprites.filter((sprite: any) => sprite.id !== id);
        const reOrderedSprites = updatedSprites.map((sprite: any, index: number) => ({
            ...sprite,
            index: index,
          }));
        localStorage.setItem("savedSprites", JSON.stringify(reOrderedSprites));
        setSprites(reOrderedSprites); 

    }
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
      
        const oldIndex = sprites.findIndex((s) => s.id === active.id);
        const newIndex = sprites.findIndex((s) => s.id === over.id);
        const reordered = arrayMove(sprites, oldIndex, newIndex).map((sprite, i) => ({
          ...sprite,
          index: i,
        }));
      
        setSprites(reordered);
        localStorage.setItem("savedSprites", JSON.stringify(reordered));
      };
  return (
    <div className="max-w-3xl mx-auto p-5 ">
      <h1 className="text-3xl font-bold mb-6 ">My Saved Sprites</h1>
     
      <div className="flex flex-row gap-x-6 justify-start mx-auto mb-10">
        <Dialog open={isOpen} >
            <DialogTrigger asChild>
            <Button onClick={()=>{setIsOpen(true)}} size="sm" variant="secondary" className=" rounded-lg ">Load Sprites from bmem</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Load Sprites from bmem</DialogTitle>
          <DialogDescription>
            Paste your bmem.mem file here to generate a canvas for each sprite. Each character should be 256 lines long.
          </DialogDescription>
        </DialogHeader>
        <Textarea className="w-full !font-mono  !text-accent-foreground h-80 mx-auto border-secondary" value={textarr}
         onChange={(e)=>{setTextArr(e.target.value)}}>
        </Textarea>
        <DialogFooter className="flex flex-row justify-between">
          
                <Button onClick={()=>{setTextArr("")}} >Clear</Button>
            <Button onClick={()=>{loadBmem();setIsOpen(false)}} type="submit">Submit</Button>
      
          
        </DialogFooter>
        <div onClick={()=>{setIsOpen(false)}} className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <XIcon/>
        </div>
      </DialogContent>

        </Dialog>
        <Dialog open={genisopen} >
            <DialogTrigger asChild>
            <Button onClick={generateBmem} size="sm" variant="secondary" className="rounded-lg text-sm">Generate bmem from sprites</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Generate bmem</DialogTitle>
          <DialogDescription>
            Copy the text below as your project's bmem.mem file!
          </DialogDescription>
        </DialogHeader>
        <Textarea className="w-full !font-mono  !text-accent-foreground h-80 mx-auto border-secondary" value={bmem}
        >
        </Textarea>
        <DialogFooter className="flex flex-row justify-between">
          
                <Button onClick={()=>{navigator.clipboard.writeText(bmem); toast("bmem contents copied!");}} >Copy</Button>
            <Button onClick={()=>{setGenIsOpen(false)}} >Close</Button>
      
          
        </DialogFooter>
        <div onClick={()=>{setGenIsOpen(false)}} className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <XIcon/>
        </div>
      </DialogContent>

        </Dialog>
        <Dialog open={clearisopen} >
            <DialogTrigger asChild>
            <Button variant="outline" onClick={()=>{setClearIsOpen(true)}}
        >Clear Sprites</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
<div className="text-center">
Are you sure you want to delete all sprites?
</div>
<div className="flex flex-row space-x-4 text-center mx-auto">
<DialogFooter>
  <Button
    type="submit"
    variant="destructive"
    onClick={()=>{
        localStorage.removeItem("savedSprites");

        setSprites([]);
        setClearIsOpen(false);
    }}>
    Delete
  </Button>
</DialogFooter>
<DialogFooter>
  <Button
    variant="secondary"
    onClick={() => {
      setClearIsOpen(false);
    }}
  >
    Cancel
  </Button>
</DialogFooter>
</div>
</DialogContent>

        </Dialog>
        <Button variant="outline" onClick={() => setReorderMode((prev) => !prev)}>
  {reorderMode ? "Done Reordering" : "Reorder Sprites"}
</Button>
        

      </div>
      <div>
      {reorderMode ? (
  <DndContext
    sensors={sensors}
    collisionDetection={closestCenter}
    onDragEnd={handleDragEnd}
  >
    <SortableContext
      items={sprites.map((s) => s.id)}
      strategy={horizontalListSortingStrategy}
    >
      <div className="mt-6 grid gap-6 grid-cols-2 md:grid-cols-3">
        {sprites.map((sprite) => (
          <SortableMiniCanvas
            key={sprite.id}
            sprite={sprite}
            onDelete={() => deleteSprite(sprite.id)}
          />
        ))}
      </div>
    </SortableContext>
  </DndContext>
) : (
  <div className="mt-6 grid gap-6 grid-cols-2 md:grid-cols-3">
  {sprites.map((sprite) => (
<MiniCanvas grid={sprite.grid} id={sprite.id} name={sprite.name} index={sprite.index} onDelete={() => deleteSprite(sprite.id)} />        ))}
<Button onClick={()=>{router.push("/")}} variant="outline" className="p-2 w-1/2 rounded-full my-auto mx-auto">
        <Plus/>
        Add new</Button>
</div>
)}

        
     
      </div>
    </div>
  );
}

type minicanvasprops = {grid:string[][],id:string,name:string,onDelete:()=>void, index:number, sorting?:boolean}
function MiniCanvas({grid,id,name,onDelete,index,sorting}:minicanvasprops) {
    const [deleteopen,setDeleteOpen] = useState<boolean>(false);
    
    const router = useRouter();

    const handleDelete = () =>{
        onDelete();
        setDeleteOpen(false);
    }

    return (
    <Card draggable={true} key={id} className={sorting? "gap-y-2  border-destructive bg-transparent hover:shadow-xl border-2 transition-all relative group":"gap-y-2  hover:bg-accent transition-all relative group"}
    >
        <CardHeader>
        <Dialog open={deleteopen} onOpenChange={setDeleteOpen}>
<DialogTrigger asChild>
<Button variant="outline" size="icon" className="absolute top-2 right-2  text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs p-0"
        onClick={() => { setDeleteOpen(true) }}>
        <X />
      </Button>
</DialogTrigger>

<DialogContent className="sm:max-w-[425px]">
<div className="text-center">
Are you sure you want to delete this sprite?
</div>
<div className="flex flex-row space-x-4 text-center mx-auto">
<DialogFooter>
  <Button
    type="submit"
    variant="destructive"
    onClick={handleDelete}
  >
    Delete
  </Button>
</DialogFooter>
<DialogFooter>
  <Button
    variant="secondary"
    onClick={() => {
      setDeleteOpen(false);
    }}
  >
    Cancel
  </Button>
</DialogFooter>
</div>
</DialogContent>
</Dialog>

        <CardTitle>Sprite {index}</CardTitle>
        </CardHeader>
        <CardContent className="mx-auto">
        <div className="cursor-pointer mx-auto " onClick={()=>{localStorage.setItem("selectedSpriteId",id);
                router.push(`/sprites/${index}`);
            }}>
      {grid.map((row, i) => (
        <div key={i} className="flex ">
          {row.map((color, j) => (
            <div
              key={j}
              className="w-[10px] h-[10px] border-gray-700 border-[0.5px]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      ))}
    </div>

       
        </CardContent>
    </Card>

    
  );
}
function SortableMiniCanvas({ sprite, onDelete }: { sprite: Sprite, onDelete: () => void }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: sprite.id,
    });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
  
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <MiniCanvas
          grid={sprite.grid}
          id={sprite.id}
          name={sprite.name}
          index={sprite.index}
          onDelete={onDelete}
          sorting={true}
        />
      </div>
    );
  }
  

/*          <div key={sprite.id} className="border p-2 shadow rounded">
            <p className="text-sm font-semibold mb-2">{sprite.name} </p>
            <MiniCanvas grid={sprite.grid} id={sprite.id} />
          </div>
*/
/*
{()=>{
            localStorage.removeItem("savedSprites");

            setSprites([]);
        }
*/

/* 
      <div className="mt-6 grid gap-6 grid-cols-2 md:grid-cols-3">
        {sprites.map((sprite) => (
 <MiniCanvas grid={sprite.grid} id={sprite.id} name={sprite.name} index={sprite.index} onDelete={() => deleteSprite(sprite.id)} />        ))}

*/    
