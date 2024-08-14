import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const PlanListView = ({ event }) => {
    const navigate = useNavigate();

    const handleEdit = (step) => {
        navigate(`/createPlan`, { state: { step } }); //해당 단계로 이동
    };

    return(
        <Box>
          <Typography variant="h5">{event.title}</Typography>
    
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography><strong>장소:</strong> {event.extendedProps.location || '없음'}</Typography>
            <Button onClick={() => handleEdit(1)} variant="outlined" size="small">수정</Button>
          </Box>
    
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography><strong>일정:</strong> {event.start.toLocaleDateString()} - {event.end ? event.end.toLocaleDateString() : '하루'}</Typography>
            <Button onClick={() => handleEdit(1)} variant="outlined" size="small">수정</Button>
          </Box>
    
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography><strong>인원수:</strong> {event.extendedProps.people || '없음'}</Typography>
            <Button onClick={() => handleEdit(1)} variant="outlined" size="small">수정</Button>
          </Box>
    
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography><strong>예산:</strong> {event.extendedProps.budget || '없음'}</Typography>
            <Button onClick={() => handleEdit(1)} variant="outlined" size="small">수정</Button>
          </Box>
    
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography><strong>관광지:</strong> {event.extendedProps.attractions || '없음'}</Typography>
            <Button onClick={() => handleEdit(2)} variant="outlined" size="small">수정</Button>
          </Box>
    
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography><strong>숙소:</strong> {event.extendedProps.accommodation || '없음'}</Typography>
            <Button onClick={() => handleEdit(3)} variant="outlined" size="small">수정</Button>
          </Box>
        </Box>
      );
}
export default PlanListView;