const updateTime = (elem, before, after, endTime, afterCallback) => {
    const saleCountdown = elem;
    const now = Date.now();
    
    const startedBefore = now < endTime;

    if (!startedBefore)
        return afterCallback();
    
    const update = () => {
        const now = Date.now();
        const difference = endTime - now;

        if (difference < 0) {
            window.clearInterval(interval);
            saleCountdown.innerText = after;
            return afterCallback();
        }

        // Not precise at all
        const msInSecond = 1000;
        const msInMinutes = msInSecond * 60;
        const msInHours = msInMinutes * 60;
        const msInDays = msInHours * 24;
        const msInMonths = msInDays * 30.43;
        const msInYears = msInMonths * 12;
        
        const years = Math.floor(difference / msInYears);
        let rest = difference % msInYears;
        const months = Math.floor(rest / msInMonths);
        rest = rest % msInMonths;
        const days = Math.floor(rest / msInDays);
        rest = rest % msInDays;
        const hours = Math.floor(rest / msInHours);
        rest = rest % msInHours;
        const minutes = Math.floor(rest / msInMinutes);

        const formatted = `${
            years > 0 ? `${years}y ` : ''
        }${
            (months > 0 || years > 0) ? `${months}m ` : ''
        }${
            (days > 0 || years > 0 || months > 0) ? `${days}d ` : ''
        }${
            (hours > 0 || years > 0 || months > 0 || days > 0) ? `${hours}h ` : ''
        }${
            `${minutes}m`
        }`;

        saleCountdown.innerText = before.replace('{@}', formatted);
    };

    const interval = window.setInterval(update, 1000);
    update();
};