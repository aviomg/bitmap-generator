import { useEffect, useState } from "react";
import { Canvas, Sprite } from "@/components/canvas";
import { useRouter } from "next/router";
import Head from "next/head";

export default function EditSprite(){
    const router = useRouter();
    const  {index} = router.query;
   

    
    const [sprite, setSprite] = useState<Sprite | null>(null);
    const [grid,setGrid] = useState<string[][]|null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [name,setName] = useState<string>("");


    useEffect(()=>{
        if (!router.isReady){ 
            console.log("router not rdy")
            return; }// ✅ wait for route to be ready
        const { index } = router.query;
        if (!index || Array.isArray(index)) {
            console.log("array is not array");
            return;}
      

    //    console.log(index);
        //if (!index || Array.isArray(index)) return;
      //  if(!index) return;
        const indexnum = parseInt(index);
      //  console.log("didnt return")
        const saved = JSON.parse(localStorage.getItem("savedSprites") || "[]");
        console.log(saved)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const found = saved.find((s: any) => (s.index) == indexnum);
        console.log("Router ready:", router.isReady);
console.log("Index param:", index);
console.log("Saved sprites:", saved);
console.log("Found sprite:", found);
        if (found){ 
            setGrid(found.grid);
            setSprite(found)
            console.log(found);
        setName(found.name);
        console.log("the grid: " + found.grid)
        console.log(grid)
        };
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[router.isReady, router.query]);

    if (!sprite || !grid) return <div>Loading…</div>;

    return(
    <>
     <Head>
        <title>Sprite {index} | Bitmap Generator</title>
        </Head>
    <div className="max-w-[700px] mx-auto text-center p-5 flex flex-col gap-y-0 ">
			<h1 className="text-3xl font-bold ">16x16 Sprite Generator for Comp 541</h1>
            <div className="flex flex-row  ">
       
            <Canvas initialGrid={grid} editpage={true} sprite={sprite}  />   
         
            </div>
		</div>
        </>

		
    )
}