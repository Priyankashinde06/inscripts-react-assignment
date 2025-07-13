// Toolbar.tsx

interface ToolbarProps {
  onViewModeToggle: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
  onShare: () => void;
  onAddNew: () => void;
  viewMode: 'table' | 'card';
}

export const Toolbar = ({
  onViewModeToggle,
  onImport,
  onExport,
  onShare,
  onAddNew
}: ToolbarProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 px-3 py-1 justify-between border-b border-[#eeeeee] text-sm">
      <div className="flex flex-wrap items-center gap-2 md:gap-5 mb-2 md:mb-0">
        <button className="flex items-center justify-center gap-1 border-r-2 border-gray-300 px-3 py-1">
          <span className="hidden sm:inline">Tool bar</span>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"></path>
            <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"></path>
          </svg>
        </button>

        <button className="flex items-center justify-center gap-1">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.47978 1.4797C1.30227 1.65721 1.28614 1.93498 1.43137 2.13072L1.47978 2.1868L4.1695 4.87652C2.88817 5.77616 1.93052 7.11985 1.53259 8.70952C1.46554 8.97738 1.62834 9.24892 1.89621 9.31598C2.16409 9.38298 2.4356 9.22025 2.50266 8.95232C2.85564 7.54225 3.72742 6.35956 4.88944 5.59626L6.09586 6.80278C5.62419 7.28378 5.33334 7.94278 5.33334 8.66965C5.33334 10.1424 6.52724 11.3363 8 11.3363C8.72694 11.3363 9.38587 11.0454 9.86694 10.5738L13.8131 14.5201C14.0084 14.7154 14.3249 14.7154 14.5202 14.5201C14.6977 14.3426 14.7139 14.0649 14.5686 13.8691L14.5202 13.813L10.4445 9.73692L10.4453 9.73592L9.64527 8.93732L7.732 7.02445L7.73334 7.02392L5.81252 5.10513L5.81334 5.10392L5.05782 4.35024L2.18689 1.4797C1.99163 1.28444 1.67504 1.28444 1.47978 1.4797ZM6.80274 7.51025L9.15947 9.86698C8.85947 10.1575 8.4506 10.3363 8 10.3363C7.07954 10.3363 6.33334 9.59012 6.33334 8.66965C6.33334 8.21905 6.51216 7.81018 6.80274 7.51025ZM8 3.66658C7.33314 3.66658 6.68607 3.7653 6.07406 3.94992L6.89874 4.77404C7.25594 4.70346 7.62427 4.66658 8 4.66658C10.6154 4.66658 12.8733 6.45342 13.4981 8.95538C13.565 9.22325 13.8364 9.38618 14.1043 9.31932C14.3723 9.25238 14.5352 8.98098 14.4683 8.71305C13.7329 5.7684 11.077 3.66658 8 3.66658ZM8.1298 6.0061L10.664 8.53992C10.5961 7.16865 9.49814 6.07168 8.1298 6.0061Z"></path>
          </svg>
          <span className="hidden sm:inline">Hide fields</span>
        </button>

        <button className="flex items-center justify-center gap-1">
          <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"></path>
          </svg>
          <span className="hidden sm:inline">Sort</span>
        </button>

        <button className="flex items-center justify-center gap-1">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"></path>
          </svg>
          <span className="hidden sm:inline">Filter</span>
        </button>

        <button
          className="flex items-center justify-center gap-1 content-center"
          onClick={onViewModeToggle}
        >
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 20h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h6"></path>
            <path d="M18 14v7"></path>
            <path d="M18 3v7"></path>
            <path d="M15 18l3 3l3 -3"></path>
            <path d="M15 6l3 -3l3 3"></path>
          </svg>
          <span className="hidden sm:inline">Cell view</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="border border-gray-200 flex items-center justify-center gap-1 py-2 rounded-md px-2 text-gray-600 hover:bg-[#4B6A4F] hover:text-white duration-200 ease-in cursor-pointer">
          <input
            type="file"
            accept=".json,.csv"
            onChange={onImport}
            className="hidden"
          />
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 32 32" className="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 4 L 15 20.5625 L 9.71875 15.28125 L 8.28125 16.71875 L 15.28125 23.71875 L 16 24.40625 L 16.71875 23.71875 L 23.71875 16.71875 L 22.28125 15.28125 L 17 20.5625 L 17 4 Z M 7 26 L 7 28 L 25 28 L 25 26 Z"></path>
          </svg>
          <span className="hidden sm:inline">Import</span>
        </label>

        <button
          onClick={onExport}
          className="border border-gray-200 flex items-center justify-center gap-1 py-2 rounded-md px-2 text-gray-600 hover:bg-[#4B6A4F] hover:text-white duration-200 ease-in"
        >
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 32 32" className="rotate-180 text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 4 L 15 20.5625 L 9.71875 15.28125 L 8.28125 16.71875 L 15.28125 23.71875 L 16 24.40625 L 16.71875 23.71875 L 23.71875 16.71875 L 22.28125 15.28125 L 17 20.5625 L 17 4 Z M 7 26 L 7 28 L 25 28 L 25 26 Z"></path>
          </svg>
          <span className="hidden sm:inline">Export</span>
        </button>

        <button
          onClick={onShare}
          className="border border-gray-200 flex items-center justify-center gap-1 py-2 rounded-md px-2 text-gray-600 hover:bg-[#4B6A4F] hover:text-white duration-200 ease-in"
        >
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" className="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M400 255.4l0-15.4 0-32c0-8.8-7.2-16-16-16l-32 0-16 0-46.5 0c-50.9 0-93.9 33.5-108.3 79.6c-3.3-9.4-5.2-19.8-5.2-31.6c0-61.9 50.1-112 112-112l48 0 16 0 32 0c8.8 0 16-7.2 16-16l0-32 0-15.4L506 160 400 255.4zM336 240l16 0 0 48c0 17.7 14.3 32 32 32l3.7 0c7.9 0 15.5-2.9 21.4-8.2l139-125.1c7.6-6.8 11.9-16.5 11.9-26.7s-4.3-19.9-11.9-26.7L409.9 8.9C403.5 3.2 395.3 0 386.7 0C367.5 0 352 15.5 352 34.7L352 80l-16 0-32 0-16 0c-88.4 0-160 160c0 60.4 34.6 99.1 63.9 120.9c5.9 4.4 11.5 8.1 16.7 11.2c4.4 2.7 8.5 4.9 11.9 6.6c3.4 1.7 6.2 3 8.2 3.9c2.2 1 4.6 1.4 7.1 1.4l2.5 0c9.8 0 17.8-8 17.8-17.8c0-7.8-5.3-14.7-11.6-19.5c0 0 0 0 0 0c-.4-.3-.7-.5-1.1-.8c-1.7-1.1-3.4-2.5-5-4.1c-.8-.8-1.7-1.6-2.5-2.6s-1.6-1.9-2.4-2.9c-1.8-2.5-3.5-5.3-5-8.5c-2.6-6-4.3-13.3-4.3-22.4c0-36.1 29.3-65.5 65.5-65.5l14.5 0 32 0zM72 32C32.2 32 0 64.2 0 104L0 440c0 39.8 32.2 72 72 72l336 0c39.8 0 72-32.2 72-72l0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 64c0 13.3-10.7 24-24 24L72 464c-13.3 0-24-10.7-24-24l0-336c0-13.3 10.7-24 24-24l64 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L72 32z"></path>
          </svg>
          <span className="hidden sm:inline">Share</span>
        </button>

        <button
          onClick={onAddNew}
          className="bg-[#4B6A4F] text-white flex items-center justify-center gap-1 py-2 rounded-md px-3 sm:px-6"
        >
          <img alt="New Action" src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.0001%202.5C10.3452%202.5%2010.6251%202.77982%2010.6251%203.125V7.91667H12.7046C13.9702%207.91667%2014.9963%208.94268%2014.9963%2010.2083V15.368L16.4334%2013.9328C16.6777%2013.6888%2017.0734%2013.6891%2017.3173%2013.9334C17.5612%2014.1776%2017.5609%2014.5733%2017.3167%2014.8172L14.8129%2017.3177C14.5688%2017.5615%2014.1733%2017.5613%2013.9293%2017.3174L11.4289%2014.8169C11.1848%2014.5729%2011.1848%2014.1771%2011.4289%2013.9331C11.673%2013.689%2012.0687%2013.689%2012.3128%2013.9331L13.7463%2015.3665V10.2083C13.7463%209.63304%2013.2799%209.16667%2012.7046%209.16667H7.29165C6.71635%209.16667%206.24998%209.63304%206.24998%2010.2083V15.3665L7.68346%2013.9331C7.92754%2013.689%208.32327%2013.689%208.56734%2013.9331C8.81142%2014.1771%208.81142%2014.5729%208.56734%2014.8169L6.06692%2017.3174C5.82285%2017.5614%205.42712%2017.5614%205.18304%2017.3174L2.68257%2014.8169C2.43849%2014.5729%202.43849%2014.1771%202.68257%2013.9331C2.92664%2013.689%203.32237%2013.689%203.56645%2013.9331L4.99998%2015.3666V10.2083C4.99998%208.94268%206.026%207.91667%207.29165%207.91667H9.37506V3.125C9.37506%202.77982%209.65488%202.5%2010.0001%202.5Z'%20fill='white'/%3e%3c/svg%3e" />
          <span className="hidden sm:inline">New Action</span>
          <span className="sm:hidden">+</span>
        </button>
      </div>
    </div>
  );
};