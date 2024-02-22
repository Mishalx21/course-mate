import Image from "next/image";

export default function ShoppingCard() {
  return (
    <div className="w-full mt-2">
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="grid grid-cols-[15%,60%,25%] ">
          {/* Image */}
          <div className="col-span-1 inline-block">
            <Image src="/image.gif" alt="Course" width={150} height={150} />
          </div>
          {/* Course Details */}
          <div className="col-span-1 flex items-center">
            <div className="px-1">
              <h2 className="text-lg font-bold">Data Science</h2>
              <div className="flex items-center mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm10 0a3 3 0 11-6 0 3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm mr-1">$12.99</p>
                <div className="flex items-center mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0a1 1 0 01.75.34l2.75 3.24.68.8 1.52-.3a1 1 0 01.58 1.82l-1.82 1.5-.51.6.12 1.58a1 1 0 01-1.45 1.05L10 9.9l-1.8.94a1 1 0 01-1.45-1.05l.12-1.58-.51-.6-1.82-1.5a1 1 0 01.58-1.82l1.52.3.68-.8L9.25.34A1 1 0 0110 0zm0 3.57L8.91 6.3a1 1 0 01-.76.43l-2.24.44 1.62 1.32a1 1 0 01.29 1.38l-.47.65 1.76-.1a1 1 0 011 .76l.21.88-1.48.86a1 1 0 01-.52.06l-.6-.12-.88.99 1.11 1.47a1 1 0 01-.15 1.39l-.88.64.34 1.73a1 1 0 01-.98 1.18 1 1 0 01-.42-.09l-1.1-.52-1.1.52a1 1 0 01-.42.09 1 1 0 01-.98-1.18l.34-1.73-.88-.64a1 1 0 01-.15-1.39l1.11-1.47-.88-.99-.6.12a1 1 0 01-.52-.06L2.62 9.7l.21-.88a1 1 0 011-.76l1.76.1-.47-.65a1 1 0 01.29-1.38l1.62-1.32-2.24-.44a1 1 0 01-.76-.43L6 3.57l.47-.65A1 1 0 017.19 2l.64.3.64-.3a1 1 0 011.36.24l.48.65 1.12-.48a1 1 0 011.18.25l.48.65.48-.65a1 1 0 011.18-.25l1.12.48.48-.65a1 1 0 111.62 1.12l.47.65.01.01z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm mr-1">13 reviews</p>
                </div>
              </div>
            </div>
          </div>
          {/* Remove Button */}
          <div className="col-span-1 flex items-center justify-end">
            <div className="pr-1 py-2">
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
