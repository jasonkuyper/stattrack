/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function SearchPlayer(): JSX.Element {
  return (
    <>
      <label
        htmlFor="player"
        className="block font-extrabold text-xl font-medium leading-6 text-gray-900"
      >
        Add Player
      </label>
      <div className="mt-2 w-[50dvw]">
        <input
          type="text"
          name="player"
          id="player"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search For Player..."
        />
      </div>
    </>
  );
}
