import { theme } from './theme';

/**
 * Grid System Utilities
 * 4-column stretch with 20px gutters and 16px margins
 */

export const grid = {
  // Calculate column width based on screen width
  getColumnWidth: (screenWidth: number) => {
    const { columns, gutter, margin } = theme.grid;
    const availableWidth = screenWidth - (margin * 2) - (gutter * (columns - 1));
    return availableWidth / columns;
  },

  // Get width for spanning multiple columns
  getSpanWidth: (screenWidth: number, span: number) => {
    const { gutter } = theme.grid;
    const columnWidth = grid.getColumnWidth(screenWidth);
    return (columnWidth * span) + (gutter * (span - 1));
  },

  // Container styles with grid margins
  container: {
    paddingHorizontal: theme.grid.margin,
  },

  // Row with gutters
  row: {
    flexDirection: 'row' as const,
    marginHorizontal: -theme.grid.gutter / 2,
  },

  // Column with gutters
  col: {
    paddingHorizontal: theme.grid.gutter / 2,
  },

  // Predefined column widths (percentage-based for flexibility)
  columns: {
    col1: { flex: 1 }, // 25% - 1 column
    col2: { flex: 2 }, // 50% - 2 columns
    col3: { flex: 3 }, // 75% - 3 columns
    col4: { flex: 4 }, // 100% - 4 columns
  },
};

// Helper function for responsive spacing
export const spacing = (multiplier: number) => theme.spacing[4] * multiplier;

// Helper function for grid gaps
export const gridGap = theme.grid.gutter;
export const gridMargin = theme.grid.margin;
