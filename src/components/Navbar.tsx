import { useState, useMemo } from "react";
import { Table } from "./Table";
import { Toolbar } from "./Toolbar";

interface TableData {
  id: number;
  jobRequest: string;
  submitted: string;
  status: string;
  submitter: string;
  url: string;
  assigned: string;
  priority: string;
  dueDate: string;
  estValue: string;
}

export const Navbar = () => {
    const [tableData, setTableData] = useState<TableData[]>([
        {
            id: 1,
            jobRequest: "Launch social media campaign..",
            submitted: "15-11-2024",
            status: "In-process",
            submitter: "Aisha Patel",
            url: "www.aishapatel.com",
            assigned: "Sophie Choudhury",
            priority: "Medium",
            dueDate: "20-11-2024",
            estValue: "6,200,000 ₹"
        },
        {
            id: 2,
            jobRequest: "Update press kit for company red....",
            submitted: "28-10-2024",
            status: "Need to start",
            submitter: "Irfan Khan",
            url: "www.irfankhanportfo...",
            assigned: "Tejas Pandey",
            priority: "High",
            dueDate: "30-10-2024",
            estValue: "3,500,000 ₹"
        },
        {
            id: 3,
            jobRequest: "Finalize user testing feedback....",
            submitted: "05-12-2024",
            status: "In-process",
            submitter: "Mark Johnson",
            url: "www.markjohns...",
            assigned: "Rachel Lee",
            priority: "Medium",
            dueDate: "10-12-2024",
            estValue: "4,750,000 ₹"
        },
        {
            id: 4,
            jobRequest: "Design new features for the website",
            submitted: "10-01-2025",
            status: "Complete",
            submitter: "Emily Green",
            url: "www.emilygreen",
            assigned: "Tom Wright",
            priority: "Low",
            dueDate: "15-01-2025",
            estValue: "5,900,000 ₹"
        },
        {
            id: 5,
            jobRequest: "Prepare financial report for Q4",
            submitted: "25-01-2025",
            status: "Blocked",
            submitter: "Jessica Brown",
            url: "www.jessicabrown...",
            assigned: "Kevin Smith",
            priority: "Low",
            dueDate: "30-01-2025",
            estValue: "2,800,000 ₹"
        }
    ]);

    const [activeTab, setActiveTab] = useState('All Orders');
    const [showForm, setShowForm] = useState(false);
    const [newRow, setNewRow] = useState({
        jobRequest: "",
        submitted: "",
        status: "",
        submitter: "",
        url: "",
        assigned: "",
        priority: "",
        dueDate: "",
        estValue: ""
    });
    const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

    const filteredData = useMemo(() => {
        switch (activeTab) {
            case 'All Orders':
                return tableData;
            case 'Pending':
                return tableData.filter(row => row.status === 'Need to start');
            case 'Reviewed':
                return tableData.filter(row => row.status === 'In-process');
            case 'Arrived':
                return tableData.filter(row => row.status === 'Complete');
            default:
                return tableData;
        }
    }, [activeTab, tableData]);

    const toggleViewMode = () => {
        setViewMode(prevMode => prevMode === 'table' ? 'card' : 'table');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewRow(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const submittedDate = new Date().toLocaleDateString('en-GB');

        const newEntry = {
            id: tableData.length + 1,
            ...newRow,
            submitted: submittedDate
        } as TableData;

        setTableData([...tableData, newEntry]);
        setShowForm(false);
        setNewRow({
            jobRequest: "",
            submitted: "",
            status: "Select Status",
            submitter: "",
            url: "",
            assigned: "",
            priority: "Select Priority",
            dueDate: "",
            estValue: ""
        });
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                let newData: TableData[] = [];

                if (file.name.endsWith('.csv')) {
                    const lines = content.split('\n').filter(line => line.trim() !== '');
                    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

                    newData = lines.slice(1).map((line, index) => {
                        const values = line.split(',');
                        const row: Record<string, string> = {};

                        headers.forEach((header, i) => {
                            row[header] = values[i]?.trim() || '';
                        });

                        return {
                            id: tableData.length + index + 1,
                            jobRequest: row['jobrequest'] || row['job request'] || '',
                            submitted: row['submitted'] || new Date().toLocaleDateString('en-GB'),
                            status: row['status'] || 'Need to start',
                            submitter: row['submitter'] || '',
                            url: row['url'] || '',
                            assigned: row['assigned'] || '',
                            priority: row['priority'] || 'Medium',
                            dueDate: row['duedate'] || row['due date'] || '',
                            estValue: row['estvalue'] || row['est value'] || row['estimated value'] || ''
                        } as TableData;
                    });
                } else if (file.name.endsWith('.json')) {
                    const parsedData = JSON.parse(content);
                    newData = Array.isArray(parsedData) ? parsedData.map((item: any, index: number) => ({
                        id: tableData.length + index + 1,
                        jobRequest: item.jobRequest || item.job_request || item['Job Request'] || '',
                        submitted: item.submitted || new Date().toLocaleDateString('en-GB'),
                        status: item.status || 'Need to start',
                        submitter: item.submitter || '',
                        url: item.url || '',
                        assigned: item.assigned || '',
                        priority: item.priority || 'Medium',
                        dueDate: item.dueDate || item.due_date || item['Due Date'] || '',
                        estValue: item.estValue || item.est_value || item['Estimated Value'] || ''
                    } as TableData)) : [];
                }

                if (newData.length > 0) {
                    setTableData([...tableData, ...newData]);
                    alert(`${newData.length} records imported successfully!`);
                } else {
                    alert('No valid data found in the file.');
                }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                alert('Error importing file. Please check the file format and try again.');
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    const handleExport = () => {
        const dataToExport = filteredData;
        const dataStr = JSON.stringify(dataToExport, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'exported-data.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const handleShare = async () => {
        try {
            const dataToShare = {
                title: 'Table Data',
                text: 'Check out this table data',
                url: window.location.href,
            };

            if (navigator.share) {
                await navigator.share(dataToShare);
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = window.location.href;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Link copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-md mx-4">
                        <h2 className="text-lg md:text-xl font-semibold mb-2">Add New Action</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div className="mb-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Request</label>
                                    <input
                                        type="text"
                                        name="jobRequest"
                                        value={newRow.jobRequest}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                                        required
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        name="status"
                                        value={newRow.status}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                                    >
                                        <option value="Select Status">Select Status</option>
                                        <option value="Need to start">Need to start</option>
                                        <option value="In-process">In-process</option>
                                        <option value="Complete">Complete</option>
                                        <option value="Blocked">Blocked</option>
                                    </select>
                                </div>

                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Submitter</label>
                                    <input
                                        type="text"
                                        name="submitter"
                                        value={newRow.submitter}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                                        required
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                                    <input
                                        type="text"
                                        name="url"
                                        value={newRow.url}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                                    <input
                                        type="text"
                                        name="assigned"
                                        value={newRow.assigned}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                    <select
                                        name="priority"
                                        value={newRow.priority}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                                    >
                                        <option value="Select Priority">Select Priority</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>

                                <div className="col-span-2">
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                        <input
                                            type="date"
                                            name="dueDate"
                                            value={newRow.dueDate}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value</label>
                                        <input
                                            type="text"
                                            name="estValue"
                                            value={newRow.estValue}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-3 py-1 md:px-4 md:py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm md:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-3 py-1 md:px-4 md:py-2 bg-[#4B6A4F] text-white rounded hover:bg-[#3a5a3f] text-sm md:text-base"
                                >
                                    Add Action
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Toolbar 
                onViewModeToggle={toggleViewMode}
                onImport={handleImport}
                onExport={handleExport}
                onShare={handleShare}
                onAddNew={() => setShowForm(true)}
                viewMode={viewMode}
            />

            <div className="flex w-full flex-wrap md:flex-nowrap">
                <div className="hidden md:block px-2 py-1 text-sm text-gray-700 truncate border border-[#eeeeee]" style={{ width: 57 }}></div>

                <div className="w-full md:w-[724px] flex px-2 text-sm truncate gap-2 items-center bg-[#e2e2e2] border border-[#eeeeee] content-center">
                    <div className="flex items-center gap-1 bg-[#eeeeee] py-1 px-1.5 rounded-md border border-[#eeeeee] cursor-pointer">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" className="text-blue-700 text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M80 122h96a6 6 0 0 1 0 12H80a6 6 0 0 1 0-12Zm24 48H64a42 42 0 0 1 0-84h40a6 6 0 0 0 0-12H64a54 54 0 0 0 0 108h40a6 6 0 0 0 0-12Zm88-96H152a6 6 0 0 0 0 12h40a42 42 0 0 1 0 84H152a6 6 0 0 0 0 12h40a54 54 0 0 0 0-108Z"></path>
                        </svg>
                        <span className="text-gray-500">Q3 Financial Overview</span>
                    </div>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="text-red-500 cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M497.408 898.56c-.08-.193-.272-.323-.385-.483l-91.92-143.664c-6.528-10.72-20.688-14.527-31.728-8.512l-8.193 5.04c-11.007 6-10.767 21.537-4.255 32.256l58.927 91.409c-5.024-1.104-10.096-2-15.056-3.296-103.184-26.993-190.495-96.832-239.535-191.6-46.336-89.52-55.04-191.695-24.512-287.743 30.512-96.048 99.775-174.464 189.295-220.784 15.248-7.888 21.2-26.64 13.312-41.856-7.872-15.264-26.64-21.231-41.855-13.327-104.272 53.952-184.4 145.28-219.969 257.152C45.982 485.008 56.11 604.033 110.078 708.29c57.136 110.336 158.832 191.664 279.024 223.136 1.36.352 2.784.56 4.16.911l-81.311 41.233c-11.008 6.032-14.657 19.631-8.128 30.351l3.152 8.176c6.56 10.72 17.84 14.527 28.815 8.512L484.622 944.4c.193-.128.385-.096.578-.224l9.984-5.456c5.52-3.024 9.168-7.969 10.624-13.505 1.52-5.52.815-11.663-2.448-16.991zm416.496-577.747c-57.056-110.304-155.586-191.63-275.762-223.118-8.56-2.24-17.311-3.984-26.048-5.712l79.824-40.48c11.008-6.033 17.568-19.632 11.04-30.369l-3.153-8.16c-6.56-10.736-20.752-14.528-31.727-8.528L519.262 80.654c-.176.112-.384.08-.577.208l-9.967 5.472c-5.537 3.04-9.168 7.967-10.624 13.503-1.52 5.52-.816 11.648 2.464 16.976l5.92 9.712c.096.192.272.305.384.497l91.92 143.648c6.512 10.736 20.688 14.528 31.712 8.513l7.216-5.025c11.008-6 11.727-21.536 5.231-32.24l-59.2-91.856c13.008 2 25.968 4.416 38.624 7.76 103.232 27.04 187.393 96.864 236.4 191.568 46.32 89.519 55.024 191.695 24.48 287.728-30.511 96.047-96.655 174.448-186.174 220.816-15.233 7.887-21.168 26.607-13.28 41.87 5.519 10.64 16.335 16.768 27.599 16.768 4.8 0 9.664-1.12 14.272-3.488 104.272-53.936 181.248-145.279 216.816-257.119 35.536-111.904 25.393-230.929-28.574-335.152z"></path>
                    </svg>
                </div>

                <div className="hidden md:block px-2 py-1 text-sm text-gray-700 truncate border border-[#eeeeee]" style={{ width: 219 }}></div>

                <div className="w-1/2 md:w-[158px] flex px-2 py-1 text-sm text-gray-600 truncate items-center bg-[#d2e0d4] justify-center gap-1 border border-[#eeeeee] cursor-pointer">
                    <img className="w-5" alt="ABC" src="data:image/svg+xml,%3csvg%20width='17'%20height='16'%20viewBox='0%200%2017%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.49995%202C8.7761%202%208.99995%202.22386%208.99995%202.5V6.33333H10.6636C11.6761%206.33333%2012.4969%207.15414%2012.4969%208.16667V12.2944L13.6466%2011.1462C13.842%2010.9511%2014.1586%2010.9513%2014.3537%2011.1467C14.5489%2011.3421%2014.5487%2011.6587%2014.3533%2011.8538L12.3502%2013.8541C12.1549%2014.0492%2011.8385%2014.0491%2011.6434%2013.8539L9.64302%2011.8536C9.44775%2011.6583%209.44775%2011.3417%209.64302%2011.1464C9.83828%2010.9512%2010.1549%2010.9512%2010.3501%2011.1464L11.4969%2012.2932V8.16667C11.4969%207.70643%2011.1238%207.33333%2010.6636%207.33333H6.33322C5.87298%207.33333%205.49989%207.70643%205.49989%208.16667V12.2932L6.64667%2011.1464C6.84193%2010.9512%207.15852%2010.9512%207.35378%2011.1464C7.54904%2011.3417%207.54904%2011.6583%207.35378%2011.8536L5.35344%2013.8539C5.15818%2014.0492%204.8416%2014.0492%204.64634%2013.8539L2.64596%2011.8536C2.4507%2011.6583%202.45069%2011.3417%202.64595%2011.1465C2.84122%2010.9512%203.1578%2010.9512%203.35306%2011.1464L4.49989%2012.2932V8.16667C4.49989%207.15414%205.3207%206.33333%206.33322%206.33333H7.99995V2.5C7.99995%202.22386%208.22381%202%208.49995%202Z'%20fill='%23A3ACA3'/%3e%3c/svg%3e" />
                    <span className="font-[500] tracking-wide">ABC</span>
                    <span className="text-[#afafaf] text-lg tracking-wider ml-2" style={{ lineHeight: 1 }}>...</span>
                </div>

                <div className="w-1/2 md:w-[287px] flex px-2 py-1 text-sm text-gray-600 truncate items-center justify-center gap-1 bg-[#DCCFFC] border border-[#eeeeee] cursor-pointer">
                    <img className="w-5" alt="Answer" src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.0001%202.5C10.3452%202.5%2010.6251%202.77982%2010.6251%203.125V7.91667H12.7046C13.9702%207.91667%2014.9963%208.94268%2014.9963%2010.2083V15.368L16.4334%2013.9328C16.6777%2013.6888%2017.0734%2013.6891%2017.3173%2013.9334C17.5612%2014.1776%2017.5609%2014.5733%2017.3167%2014.8172L14.8129%2017.3177C14.5688%2017.5615%2014.1733%2017.5613%2013.9293%2017.3174L11.4289%2014.8169C11.1848%2014.5729%2011.1848%2014.1771%2011.4289%2013.9331C11.673%2013.689%2012.0687%2013.689%2012.3128%2013.9331L13.7463%2015.3665V10.2083C13.7463%209.63304%2013.2799%209.16667%2012.7046%209.16667H7.29165C6.71635%209.16667%206.24998%209.63304%206.24998%2010.2083V15.3665L7.68346%2013.9331C7.92754%2013.689%208.32327%2013.689%208.56734%2013.9331C8.81142%2014.1771%208.81142%2014.5729%208.56734%2014.8169L6.06692%2017.3174C5.82285%2017.5614%205.42712%2017.5614%205.18304%2017.3174L2.68257%2014.8169C2.43849%2014.5729%202.43849%2014.1771%202.68257%2013.9331C2.92664%2013.689%203.32237%2013.689%203.56645%2013.9331L4.99998%2015.3666V10.2083C4.99998%208.94268%206.026%207.91667%207.29165%207.91667H9.37506V3.125C9.37506%202.77982%209.65488%202.5%2010.0001%202.5Z'%20fill='white'/%3e%3c/svg%3e" />
                    <span className="font-[500] tracking-wide">Answer a question</span>
                    <span className="text-[#afafaf] text-lg tracking-wider ml-2" style={{ lineHeight: 1 }}>...</span>
                </div>
                <div className="w-1/2 md:w-[150px] flex px-2 py-1 text-sm text-gray-700 truncate border border-[#eeeeee] items-center justify-center bg-[#fac2af] gap-1 cursor-pointer">
                    <img className="w-5" alt="Extract" src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.0001%202.5C10.3452%202.5%2010.6251%202.77982%2010.6251%203.125V7.91667H12.7046C13.9702%207.91667%2014.9963%208.94268%2014.9963%2010.2083V15.368L16.4334%2013.9328C16.6777%2013.6888%2017.0734%2013.6891%2017.3173%2013.9334C17.5612%2014.1776%2017.5609%2014.5733%2017.3167%2014.8172L14.8129%2017.3177C14.5688%2017.5615%2014.1733%2017.5613%2013.9293%2017.3174L11.4289%2014.8169C11.1848%2014.5729%2011.1848%2014.1771%2011.4289%2013.9331C11.673%2013.689%2012.0687%2013.689%2012.3128%2013.9331L13.7463%2015.3665V10.2083C13.7463%209.63304%2013.2799%209.16667%2012.7046%209.16667H7.29165C6.71635%209.16667%206.24998%209.63304%206.24998%2010.2083V15.3665L7.68346%2013.9331C7.92754%2013.689%208.32327%2013.689%208.56734%2013.9331C8.81142%2014.1771%208.81142%2014.5729%208.56734%2014.8169L6.06692%2017.3174C5.82285%2017.5614%205.42712%2017.5614%205.18304%2017.3174L2.68257%2014.8169C2.43849%2014.5729%202.43849%2014.1771%202.68257%2013.9331C2.92664%2013.689%203.32237%2013.689%203.56645%2013.9331L4.99998%2015.3666V10.2083C4.99998%208.94268%206.026%207.91667%207.29165%207.91667H9.37506V3.125C9.37506%202.77982%209.65488%202.5%2010.0001%202.5Z'%20fill='white'/%3e%3c/svg%3e" />
                    <span className="font-[500] tracking-wide">Extract</span>
                    <span className="text-[#afafaf] text-lg tracking-wider ml-2" style={{ lineHeight: 1 }}>...</span>
                </div>

                <div className="w-1/2 md:w-[150px] flex px-2 py-1 text-sm text-gray-700 truncate border border-[#eeeeee] bg-[#eeeeee] items-center justify-center cursor-pointer">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-3xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.75 4.5a.75.75 0 0 1 .75.75V11h5.75a.75.75 0 0 1 0 1.5H12.5v5.75a.75.75 0 0 1-1.5 0V12.5H5.25a.75.75 0 0 1 0-1.5H11V5.25a.75.75 0 0 1 .75-.75Z"> </path>
                    </svg>
                </div>
            </div>

            <Table data={filteredData} viewMode={viewMode} />

            <div className="sticky bottom-0 bg-white border-t border-[#eeeeee] py-2 px-4 flex justify-between items-center w-full">
                <div className="flex space-x-2 md:space-x-4 overflow-x-auto">
                    {['All Orders', 'Pending', 'Reviewed', 'Arrived'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-2 text-sm font-medium whitespace-nowrap rounded-md ${activeTab === tab
                                ? 'text-[#4B6A4F] font-semibold border-b-2 border-[#4B6A4F]'
                                : 'text-gray-700 hover:text-[#4B6A4F]'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                    <div className="text-2xl cursor-pointer">+</div>
                </div>
            </div>
        </div>
    );
};