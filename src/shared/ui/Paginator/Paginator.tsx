import { Fragment, memo, useMemo } from "react";
import { Button } from "../Button/Button";

interface PaginatorProps {
  page: number,
  total: number,
  onChange: (page: number) => void;
}

const range = 8;

export const Paginator = memo<PaginatorProps>(({
  page,
  total,
  onChange
}) => {

  const currentPages = useMemo(() => {
    let prevRange: undefined | number; // 3
    let afterRange: undefined | number; // 4
    const pages: number[] = [];

    if (range % 2 === 1) {
      prevRange = Math.ceil(range / 2);
      afterRange = range - prevRange - 1;
    } else {
      afterRange = range / 2;
      prevRange = afterRange - 1;
    }

    let prevPageResult = page - prevRange;
    let afterPageResult = total - (page + afterRange);

    let minPage = Math.max(1, page - prevRange); // 10 - 3 = 7
    let maxPage = Math.min(total, page + afterRange); // 10 + 4 - 14

    if (prevPageResult < 0) {
      maxPage += Math.abs(prevPageResult);
    }
    if (afterPageResult < 0) {
      minPage += afterPageResult;
      if (minPage <= 0) minPage = 1;
    }

    for (let i = minPage; i <= maxPage; i++) {
      pages.push(i);
      if (i === total) break;
    }

    return pages

  }, [total, page])

  const handleChange = (nextPage: number) => {
    if (page !== nextPage)
      onChange?.(nextPage);
  }

  const nextPage = () => {
    onChange?.(page + 1);
  };

  const prevPage = () => {
    onChange?.(page - 1);
  };

  return <div className="paginator">
    <Button
      disabled={page <= 1}
      onClick={prevPage}
      mod="tab"
    >
      Пред.
    </Button>
    {
      currentPages.map((availablePage, index) => (
        <Fragment key={availablePage}>
          {
            index === 0 && availablePage > 1 && "..."
          }
          <Button
            onClick={handleChange.bind(null, availablePage)}
            isActive={availablePage === page}
            mod="tab"
          >
            {availablePage}
          </Button>
          {
            index + 1 === currentPages.length && availablePage !== total && "..."
          }
        </Fragment>
      ))
    }
    <Button
      disabled={page >= total}
      onClick={nextPage}
      mod="tab"
    >
      След
    </Button>
  </div>
})