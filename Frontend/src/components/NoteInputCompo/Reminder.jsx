import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";


export default function Reminder({
  isRemiderOpen,
  setIsReminderOpen,
  reminderDate,
  setReminderDate,
}) {
  console.log(reminderDate);
  const handleDateChange = (e) => {
    const localDate = new Date(e.target.value);

    // IST is UTC+5:30 → convert local to IST
    const istOffset = 5.5 * 60 * 60 * 1000; // in milliseconds
    const istDate = new Date(localDate.getTime() + (istOffset - localDate.getTimezoneOffset() * 60 * 1000));

    // Optional: format as ISO string or just use istDate.toISOString().slice(0, 16) for input compatibility
    const istFormatted = istDate.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM'

    setReminderDate(istFormatted);
  };
  console.log(reminderDate);

  return (
    <div className="relative group/reminder ml-2 transition-all duration-300 ease-in-out">
      <button
        onClick={() => setIsReminderOpen((prev) => !prev)}
        className="flex items-center justify-center cursor-pointer p-1 transition duration-300 ease-in-out"
      >
        <FontAwesomeIcon
          icon={faBell}
          className={`text-xl 
                    ${isRemiderOpen ? "text-gray-400" : "text-gray-200"}
                   hover:shadow-lg transition duration-300 ease-in-out`}
        />
      </button>

      {!isRemiderOpen && (
        <div className="absolute bg-[#1f3a3b] bottom-full left-1/2 -translate-x-6 translate-y-7 mb-1 px-2 py-1 text-gray-200 text-xs rounded opacity-0 group-hover/reminder:opacity-100 group-hover/reminder:translate-y-14 transition-all duration-300 ease-in-out whitespace-nowrap">
          Remind me
        </div>
      )}

      {isRemiderOpen && (
        <div className="absolute bg-[#6f6f6f] text-gray-200 bottom-full left-1/2 -translate-x-2 translate-y-16 border-none">
          <input
            type="datetime-local"
            value={reminderDate}
            onChange={handleDateChange}
            className="rounded border p-1"
          />
        </div>
      )}
    </div>
  );
}
