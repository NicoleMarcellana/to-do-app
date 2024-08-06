export function formatDate(date) {
    if (!date) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('en-US', options);
  }
  
  export function formatTime(time) {
    if (!time) return '';
    
    const [timePart, period] = time.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    const adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : period === 'AM' && hours === 12 ? 0 : hours;
    
    const date = new Date(1970, 0, 1, adjustedHours, minutes);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleTimeString('en-US', options);
  }
  