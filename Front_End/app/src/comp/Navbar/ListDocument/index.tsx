import { Avatar, Button, Container, Typography, colors } from '@mui/material'
 
import {SxProps, Theme}  from "@mui/material"
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Document } from '../../DTO/NavbarDto/Document.dto';
type Props = {
  data: Document
}

function ListDocument({data}: Props) {
  const {doc_id,FileName}  =data;
  
  const Avatar_sx  : SxProps<Theme> = {
      fontWeight:"bold",
      display:"flex",
      justifyContent:'center',
      textAlign:'center',
      alignItems:"center",
      padding:'1rem',
      gap:'5px',
      overflow:"hidden",
      
    
  }
  return (
    <Container  sx={Avatar_sx}>
        <Avatar>
          <PictureAsPdfIcon />
        </Avatar>
          <Typography variant='h6'  noWrap>
                    {FileName}  
          </Typography>
    </Container>
  )
}

export default ListDocument