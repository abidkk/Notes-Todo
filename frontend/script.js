// Fetch
document.addEventListener("DOMContentLoaded", () => {
  const notesList = document.querySelector("#notes-items");

  // Function to fetch all notes from backend
  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/notes");
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const notes = await response.json();
      notes.map((note) => {
        return (
          // Clear existing notes
          (notesList.innerHTML += `  
                        <li class="notes bg-gray-200 w-[100%] p-5  hover:bg-green-950 hover:text-gray-200  duration-500">
                            <p class=" border-b border-gray-300 pb-4 min-h-20">${note.description}</p>
                            <ul class="flex flex-wrap gap-2 justify-between items-center pt-2 text-gray-500">
                                <li>Reference: ${note.refrence}</li>
                                <li>Category: ${note.category}</li>
                            </ul>
                        </li>
                   
     `)
        );
      });
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  // Fetch notes when the page loads
  fetchNotes();
});
