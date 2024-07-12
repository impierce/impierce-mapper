use ratatui::{buffer::Buffer, layout::Rect, prelude::*, widgets::*};

use crate::state::{translate, AppState};

pub fn render_end_p4(area: Rect, buf: &mut Buffer, state: &mut AppState) {
    Block::new().style(Style::default().fg(Color::White)).render(area, buf);

    let vertical_margin = if area.height >= 3 { (area.height - 3) / 2 } else { 0 };

    let txt = format!(
        "{}: {}\n{}: {}",
        translate("mapping_complete_1"),
        state.output_path,
        translate("mapping_complete_2"),
        state.custom_mapping_path
    );

    Paragraph::new(txt)
        .centered()
        .alignment(Alignment::Center)
        .wrap(Wrap { trim: true })
        .render(
            area.inner(&Margin {
                vertical: vertical_margin,
                horizontal: 4,
            }),
            buf,
        );
}
