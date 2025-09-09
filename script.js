const facultes = [
    { name: "E505", capacity: 10, faculty: "Mathematics" },
    { name: "C303", capacity: 12, faculty: "Physics" },
    { name: "A101", capacity: 15, faculty: "Computer Science" },
    { name: "B202", capacity: 18, faculty: "Mathematics" },
    { name: "D404", capacity: 20, faculty: "Computer Science" }
  ];
  
  window.onload = function () {
    const selectfacultes = document.querySelector('.select-facultes');
    const groupinput = document.querySelector('.group-input');
    const facultyinput = document.querySelector('.faculty-input');
    const studentsInput = document.querySelector('.students-input');
    const bth = document.querySelector('.btn-filter');
    const Bthsort = document.querySelector('.bth-sort');
    const container = document.getElementById('classrooms-container');
    let currentData = [...facultes];
    let sortDescending = true
  
    function renderClassrooms(data) {
      container.innerHTML = '';
      data.forEach(room => {
        const card = document.createElement('div');
        card.className = 'classroom_card';
        card.innerHTML = ` 
          <h3>${room.name}</h3>
          <p>Capacity: ${room.capacity}</p>
          <p>Faculty: ${room.faculty}</p>
        `
        container.appendChild(card);
      });
    }
  
    renderClassrooms(facultes);
  
    bth.addEventListener('click', (e) => {
      e.preventDefault();
  
      const selectedFaculty = selectfacultes.value;
      const group = groupinput.value.trim().toLowerCase();
      const facultyText = facultyinput.value.trim().toLowerCase();
      const studentsCount = parseInt(studentsInput.value);
  
      const filtered = facultes.filter(room => {
        const matchFaculty = selectedFaculty === 'all' || room.name === selectedFaculty;
        const matchGroup = group === '' || room.name.toLowerCase().includes(group);
        const matchFacultyText = facultyText === '' || room.faculty.toLowerCase().includes(facultyText);
        const matchCapacity = isNaN(studentsCount) || room.capacity >= studentsCount;
  
        return matchFaculty && matchGroup && matchFacultyText && matchCapacity;
      });
      currentData = filtered;
      renderClassrooms(currentData);
    })
    Bthsort.addEventListener('click', () => {
        if (sortDescending) {
          currentData.sort((a, b) => b.capacity - a.capacity);
        } else {
          currentData.sort((a, b) => a.capacity - b.capacity);
        }
        sortDescending = !sortDescending;
        renderClassrooms(currentData);
      });
  };