import  Paper  from "@mui/material/Paper";
import Container from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from 'next/image';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AccessTime } from "@mui/icons-material"
import Rating from "@mui/material/Rating";
import {createTheme,ThemeProvider} from "@mui/material";
import Link from "next/link";
const theme1 = createTheme({
    components: {
        MuiTypography: {
            variants:[{
                props:{
                    variant: "body2",
                },
                style:
                {
                    fontSize: 11,
                    
                }
            },
            {
                props:{
                    variant: "body3",
                },
                style:
                {
                    fontSize: 9,
                }
            }
            ]
        }
    },
});
export default function Course_Card_New({ course_id, course_name, course_rating, course_price, review_count }) {

    return (
    
       <Grid item xs={3} >
        <Link href={`/courses/${course_id}`}>
        <ThemeProvider theme={theme1}>
        <Paper elevation={10}>
            <Image src="/image.gif" alt="course" className="img" height={200} width={300} />
            <Box paddingX={1}>
            <Typography variant="subtitle1" component="h2" fontWeight="bold">
                {course_name}
            </Typography>
            <Box
                sx={
                    {
                        display: 'flex',
                        alignItems: 'center',

                    }
                }
                >
                <AccessTime sx={{width :12.5}} />
                <Typography variant="body2" component="p" marginLeft={0.5}>
                    5 hours
                       </Typography>
            

            </Box>
            <Box sx={
                    {
                        display: 'flex',
                        alignItems: 'center',

                    }
                    } marginTop={3}>
                    <Rating name="read-only" value={course_rating} readOnly precision={0.5} size="small"></Rating>
                    <Typography variant="body2" component="p" marginLeft={0.5}>
                    {course_rating}
                    </Typography>
                    <Typography variant="body3" component="p" marginLeft={1.5}>
                    ({review_count} review)
                    </Typography>
            </Box>
            <Box>
            <Typography variant="h6" component="h3" marginTop={0}>
                    $ {course_price}
                    </Typography>

            </Box>
            </Box>            
        </Paper>
        </ThemeProvider>
        </Link>
        </Grid>
        
    );
}
