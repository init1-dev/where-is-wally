export const toTop = (behavior?: ScrollBehavior | undefined) => {
    window.scrollTo({ top: 0, behavior: behavior});
};

export default toTop;