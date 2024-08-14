import React from 'react';
import { Modal, Box, Typography} from '@mui/material';

const MuiModal = ({
  open,
  onClose,
  title,
  content,
  actions,
  width = 400, // 기본 넓이를 설정할 수 있음
  hideActions = false, // 액션 버튼을 숨길지 여부
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: width,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        {title && (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        )}
        {content && <Box>{content}</Box>}
        {!hideActions && actions && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            {/* actions가 배열이 아닌 경우도 처리 */}
            {Array.isArray(actions) ? (
              actions.map((action, index) => (
                <Box key={index} sx={{ ml: 1 }}>
                  {action}
                </Box>
              ))
            ) : (
              <Box sx={{ ml: 1 }}>
                {actions}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default MuiModal;
