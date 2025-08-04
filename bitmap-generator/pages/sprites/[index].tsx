import { useEffect, useState } from "react";
import { Canvas, Sprite } from "@/components/canvas";
import { useRouter } from "next/router";

export default function EditSprite(){
    const router = useRouter();
    const  {index} = router.query;
   

    
    const [sprite, setSprite] = useState<Sprite | null>(null);
    const [grid,setGrid] = useState<string[][]|null>(null);
    const [name,setName] = useState<string>("");


    useEffect(()=>{
        console.log(index);
        if(!index) return;
        const indexnum = parseInt(index);
        console.log("didnt return")
        const saved = JSON.parse(localStorage.getItem("savedSprites") || "[]");
        console.log(saved)
        const found = saved.find((s: any) => (s.index) == indexnum);
        
        if (found){ setSprite(found)
            console.log(found);
        setGrid(found.grid);
        setName(found.name);
        console.log("the grid: " + found.grid)
        console.log(grid)
        };
        
    },[index]);


    if (!sprite) return <div>Loading...</div>;

    return(<div className="max-w-[700px] mx-auto text-center p-5 flex flex-col gap-y-0 ">
			<h1 className="text-3xl font-bold ">16x16 Sprite Generator for Comp 541</h1>
            <div className="flex flex-row  ">
       
            <Canvas initialGrid={grid} editpage={true} sprite={sprite}  />   
         
            </div>
		</div>

		
    )
}