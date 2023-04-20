let shouldNotDelay = false;

export const Delay = ({ value = 1000 }) => {
    if (shouldNotDelay) {
        return null;
    }
    throw new Promise((resolve) => {
        setTimeout(() => {
            shouldNotDelay = true;
            resolve(1);
        }, value);
    });
};
