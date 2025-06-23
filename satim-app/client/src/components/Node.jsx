import { Tooltip } from "@mui/material";
import { Handle, Position } from "reactflow";

export const CustomNode = ({ data }) => {
    return (
        <Tooltip title={data.label} arrow>
            <div
                style={{
                    width: '180px',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    background: '#fff',

                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal',
                    fontSize: '14px',
                    fontFamily: 'Arial, sans-serif',
                }}>
                {data.label}

                <Handle
                    type="target"
                    position={Position.Top}
                    style={{ background: '#555' }}
                />
                <Handle
                    type="source"
                    position={Position.Bottom}
                    style={{ background: '#555' }}
                />
            </div>
        </Tooltip>
    );
};
