import './ToggleComponent.css';

interface ToggleButtonProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?:any;
}

const ToggleButton = (props: ToggleButtonProps) => {
    const { label, checked, onChange,className } = props;

    const handleChange = (checked: any) => {
        if (onChange) {
            onChange(checked);
        }
    }

    return (
        <label className="switch">
            {label && (
                <span className={className ? className:'label-text'}>
                    {label}
                </span>
            )}
            <input type="checkbox" checked={checked} onChange={handleChange} />
            <span className="slider round"></span>
        </label>
    )
}
export default ToggleButton;