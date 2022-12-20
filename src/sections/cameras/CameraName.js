import { Button } from '@mui/material';
import { openStreamUrl } from '../../utils/urlHelper';
import Iconify from '../../components/Iconify';

export default function CameraName({ cameraName, streamUrl }) {
    return (
        <>
        {streamUrl?.trim()?.length > 0 ? (
            <Button color="primary" size="small" onClick={() => openStreamUrl(streamUrl)}>
                {cameraName}
                <Iconify icon={'ic:sharp-launch'} />
            </Button>
        ) : (
            <>{cameraName}</>
        )}
        </>
    );
}