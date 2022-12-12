const Jumbotron = () => {
  return (
    <div className="py-12 px-7 shadow-lg rounded-lg bg-gray-200 text-gray-700 flex flex-col items-center md:py-15 md:px-20 md:w-48 ">
      <h2 className="font-semibold text-xl md:text-3xl mb-5 textpali">
        マンダラアプリへようこそ！
      </h2>
      <p className="text-center text-xs md:text-base">
        マンダラアプリを使って同じ目標をもつ <br />{' '}
        仲間と一緒に目標を達成しよう！
      </p>
      <button
        type="button"
        className="inline-block px-8 py-3 mt-6 bg-blue-500 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
      >
        登録する
      </button>
    </div>
  );
};

export default Jumbotron;
