import { Canvas } from "@/components/canvas";




export default function Home(){
    return(<div className="max-w-[600px] mx-auto text-center p-5 flex flex-col gap-y-5 ">
			<h1 className="text-3xl font-bold ">16x16 Sprite Generator for Comp 541</h1>
            <Canvas />
            <button className="mt-2" >Undo</button><br />
			Just click on the board to color it with with whatever color is currently selected
			<div>
				<label>Select Color</label>
				<i className="fa fa-eyedropper" aria-hidden="true" id = "eyedropper"></i>
				<input type = "color" id = "colorizer" value = "#0000ff" />
				<button >Color Entire Board</button>
			</div>
			<textarea id = "bitmap"></textarea>
			<div>
				<label>Live update of Hexcodes</label>
				<input id="liveUpdate" type="checkbox" />
			</div>
			<div className = "my-2.5 mx-auto">
				<button >Generate hexcodes</button>
				<button >Copy to Clipboard</button>
				<button >Load from Textarea</button>
				<button >Toggle Border</button>
			</div> 
		</div>

		
    )
}
