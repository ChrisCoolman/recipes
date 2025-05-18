
type RecipeCardProps = {
    title: string,
    imageUrl: string
}


function RecipeCard({ title, imageUrl }: RecipeCardProps) {
    return(
        <div>
            <div className="recipe-card bg-white text-orange text-center p-1 m-8 rounded-4xl w-2xs h-66 flex items-center justify-center flex-col shadow-lg transition-all ease-in-out hover:rotate-x-20 hover:scale-105">
                <img src={imageUrl} alt="Recipe" className="rounded-full w-32 h-32"/>
                <div className="pt-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;