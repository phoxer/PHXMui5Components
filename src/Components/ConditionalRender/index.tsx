/** 1.0.0 | www.phoxer.com */

type TConditionalRender = {
    children: React.ReactNode;
    condition: boolean;
    showOnNoCondition?: React.ReactNode;
}

const ConditionalRender: React.FC<TConditionalRender> = ({ children, condition, showOnNoCondition }) => {
    return (<>
        {condition ? children : null}
        {!condition && showOnNoCondition}
    </>)
};

export default ConditionalRender;