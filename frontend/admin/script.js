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

            <div class="py-5">
                                        
                          <li class="notes bg-gray-200 w-[100%] p-5  hover:bg-green-950 hover:text-gray-200  duration-500">
                              <p class=" border-b border-gray-300 pb-4 min-h-20">${note.description}</p>
                              <ul class="flex flex-wrap gap-2 justify-between items-center  pt-2 text-gray-500">
                                  <li class="">Reference: ${note.refrence}</li>
                                  <li>Category: ${note.category}</li>
                              </ul>
                          </li>
                                <div class="flex justify-center"><button onclick="delNote('${note._id}')">Delete </button></div>
            </div>

                     
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

// Function to delete a note
function delNote(id) {
  const confirms = confirm("Are you sure you want to delete");
  console.log(confirms);

  if (confirms == true) {
    fetch(`http://localhost:3002/api/notes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to delete note");
        }
        setTimeout(() => {
            location.reload();
          },1000)
 
      
        // Handle success
        // Update UI or fetch notes again to reflect changes
      })
      .catch((error) => console.error("Error deleting note:", error.message));
  }
  
}










// POST
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-note-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Validate form fields if needed
        const description = form.elements['description'].value.trim();
        const refrence = form.elements['refrence'].value.trim();
        const category = form.elements['category'].value;

        if (!description || !refrence || !category) {
            alert('Please fill out all fields');
            return;
        }

        // Prepare data to send in POST request
        const formData = {
            description,
            refrence,
            category
        };

        try {
            const response = await fetch('http://localhost:3002/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create note');
            }

            const data = await response.json();
            console.log('Note created:', data);

            // Optionally, reset the form after successful submission
            form.reset();

            // Handle success (e.g., show confirmation to user)
            alert('Note created successfully');

     
        } catch (error) {
            console.error('Error creating note:', error.message);
            alert('Failed to create note. Please try again.');
        }
    });
});