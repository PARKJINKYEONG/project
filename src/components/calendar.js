import * as React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = ({ onEventClick }) => {
      return (
        <div className="calendar-container">
            <FullCalendar 
                defaultView="dayGridMonth" 
                plugins={[ dayGridPlugin ]}
                events={[
                  { title: '제주도 일정', start: '2024-08-19', end: '2024-08-24' }
              ]}
              eventClick={onEventClick}
              aspectRatio={1.5}
              showNonCurrentDates={false}
              fixedWeekCount={false} 
            />
        </div>
      );
  };


export default Calendar;