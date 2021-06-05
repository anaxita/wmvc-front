export const FixedError = ({err}) => {
    return (
        <div className="text-danger bg-warning p-1 rounded my-fixed-error" style={{ zIndex: 2 }}>
            {err}
        </div>
    )
}