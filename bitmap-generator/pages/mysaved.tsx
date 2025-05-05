
export default function Mysaved(){

const savedSprites = JSON.parse(localStorage.getItem("savedSprites") || "[]");

return (
  <div>
    <h2>My Saved Sprites</h2>
    {savedSprites.map((sprite: any) => (
      <div key={sprite.id}>
        <h3>{sprite.name}</h3>
        <div className="grid-preview">
          {sprite.grid.map((row: string[], i: number) => (
            <div key={i} className="flex">
              {row.map((color: string, j: number) => (
                <div
                  key={j}
                  className="w-[10px] h-[10px] border border-gray-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
}