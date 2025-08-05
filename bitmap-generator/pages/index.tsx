import { Canvas } from "@/components/canvas";
  

export default function Home(){



    return(<div className="max-w-[700px] mx-auto text-center p-5 flex flex-col gap-y-0 ">
			<h1 className="text-3xl font-bold ">16x16 Sprite Generator for Comp 541</h1>
            <div className="flex flex-row  ">
            <Canvas  editpage={false}/>   
         
            </div>
<p className="mt-8">by Avi Kumar</p>
		</div>

		
    )
}
