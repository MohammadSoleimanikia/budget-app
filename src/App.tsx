import BudgetCard from "./components/BudgetCard";

function App() {
    return (
        <div className="container mx-auto border-t border-t-red-700">
            <header className="flex justify-between my-10">
                <h1 className="font-bold text-3xl">مدیریت بودجه</h1>
                <div className=" flex gap-3">
                    <button className=" bg-blue-500 text-white  hover:bg-blue-600">
                        افزدون هزینه
                    </button>
                    <button className=" border-blue-600 text-blue-700 hover:bg-blue-500 hover:text-white ">
                        افزودن بودجه
                    </button>
                </div>
            </header>

            <main className="grid gap-5 sm:grid-cols-1 items-start  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
                <BudgetCard name="تفریح" amount={52} max={300}/>
            </main>
        </div>
    );
}

export default App;
