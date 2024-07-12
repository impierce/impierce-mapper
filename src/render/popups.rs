use crate::{
    backend::selector::selector,
    state::{translate, AppState},
};

use ratatui::{
    buffer::Buffer,
    layout::{Constraint, Rect},
    prelude::*,
    widgets::*,
};

pub fn render_popup_mapping(mut area: Rect, buf: &mut Buffer, state: &mut AppState) {
    area = area.inner(&Margin {
        vertical: 4,
        horizontal: 24,
    });
    Clear.render(area, buf);
    Block::new().style(Style::default().bg(Color::Black)).render(area, buf);

    let [left, right] = Layout::horizontal(vec![Constraint::Percentage(50), Constraint::Percentage(50)]).areas(area);
    let [left_top, left_bottom] =
        Layout::vertical(vec![Constraint::Percentage(50), Constraint::Percentage(50)]).areas(left);
    let [right_top, right_bottom] =
        Layout::vertical(vec![Constraint::Percentage(50), Constraint::Percentage(50)]).areas(right);

    state.popup_path_area = left_top;
    state.popup_output_path = right_top;
    state.popup_value_area = left_bottom;
    state.popup_output_result = right_bottom;

    selector(state);

    Block::new()
        .title(format!("  {}  ", translate("input_path")))
        .add_modifier(Modifier::BOLD)
        .title_alignment(Alignment::Center)
        .borders(Borders::BOTTOM)
        .render(left_top, buf);
    Block::new()
        .borders(Borders::RIGHT)
        .border_type(BorderType::Thick)
        .render(left_top, buf);

    Block::new()
        .title(format!("  {}  ", translate("output_path")))
        .add_modifier(Modifier::BOLD)
        .title_alignment(Alignment::Center)
        .borders(Borders::BOTTOM)
        .render(right_top, buf);

    Block::new()
        .title(format!("  {}  ", translate("input_value")))
        .add_modifier(Modifier::BOLD)
        .title_alignment(Alignment::Center)
        .borders(Borders::RIGHT)
        .border_type(BorderType::Thick)
        .render(left_bottom, buf);
    Block::new()
        .title(format!("  {}  ", translate("output_result")))
        .add_modifier(Modifier::BOLD)
        .title_alignment(Alignment::Center)
        .render(right_bottom, buf);

    // Calculate maximum lines used, this sets the maximum scroll offset
    if right.width > 2 {
        state.popup_amount_lines_path =
            state.input_fields[state.selected_input_field].0.len() / (right.width as usize - 2);
        state.popup_amount_lines_value =
            state.input_fields[state.selected_input_field].1.len() / (right.width as usize - 2);
        state.popup_amount_lines_output_path =
            state.missing_data_fields[state.selected_missing_field].0.len() / (right.width as usize - 2);
        state.popup_amount_lines_result =
            state.candidate_data_value.as_ref().unwrap().len() / (right.width as usize - 2);
    }

    Paragraph::new(state.input_fields[state.selected_input_field].0.as_str())
        .wrap(Wrap { trim: false })
        .remove_modifier(Modifier::BOLD)
        .scroll((state.popup_offset_path, 0))
        .render(
            left_top.inner(&Margin {
                horizontal: 1,
                vertical: 1,
            }),
            buf,
        );

    Paragraph::new(state.input_fields[state.selected_input_field].1.as_str())
        .wrap(Wrap { trim: false })
        .remove_modifier(Modifier::BOLD)
        .scroll((state.popup_offset_value, 0))
        .render(
            left_bottom.inner(&Margin {
                horizontal: 1,
                vertical: 1,
            }),
            buf,
        );

    Paragraph::new(state.missing_data_fields[state.selected_missing_field].0.as_str())
        .wrap(Wrap { trim: false })
        .remove_modifier(Modifier::BOLD)
        .scroll((state.popup_offset_output_path, 0))
        .render(
            right_top.inner(&Margin {
                horizontal: 1,
                vertical: 1,
            }),
            buf,
        );

    Paragraph::new(state.candidate_data_value.as_ref().unwrap().as_str())
        .wrap(Wrap { trim: false })
        .remove_modifier(Modifier::BOLD)
        .scroll((state.popup_offset_result, 0))
        .render(
            right_bottom.inner(&Margin {
                horizontal: 1,
                vertical: 1,
            }),
            buf,
        );

    let [_top, confirm_area] =
        Layout::vertical([Constraint::Percentage(100), Constraint::Length(1)]).areas(right_bottom);
    let [_left, confirm_area] =
        Layout::horizontal([Constraint::Percentage(100), Constraint::Length(9)]).areas(confirm_area);

    state.confirm_button = confirm_area;
    Paragraph::new(format!(" {} ", translate("confirm")))
        .style(Style::new().fg(Color::Black).bg(Color::Green))
        .render(confirm_area, buf);
}

// Following popups have repetitive code, can be refactored
pub fn render_popup_overwrite_warning(mut area: Rect, buf: &mut Buffer) {
    area = area.inner(&Margin {
        vertical: 4,
        horizontal: 28,
    });
    Clear.render(area, buf);
    Block::new()
        .style(Style::default().fg(Color::Rgb(240, 160, 100)).bg(Color::Black))
        .borders(Borders::ALL)
        .render(area, buf);

    let mut txt = translate("file_exists");
    let width: f32 = 50. / (area.width as f32 - 2.0);

    let vertical_margin;
    if area.height >= 4 && width <= 1.0 {
        vertical_margin = (area.height - 4) / 2;
    } else {
        txt = format!("\n{}", txt).into();
        vertical_margin = 0;
    }

    Paragraph::new(txt)
        .centered()
        .alignment(Alignment::Center)
        .wrap(Wrap { trim: false })
        .render(
            area.inner(&Margin {
                vertical: vertical_margin,
                horizontal: 2,
            }),
            buf,
        );
}

pub fn render_popup_uncompleted_warning_p2(mut area: Rect, buf: &mut Buffer) {
    area = area.inner(&Margin {
        vertical: 4,
        horizontal: 28,
    });
    Clear.render(area, buf);
    Block::new()
        .style(Style::default().fg(Color::Red).bg(Color::Black))
        .borders(Borders::ALL)
        .render(area, buf);

    let mut txt = translate("missing_fields_incomplete");
    let width: f32 = 50. / (area.width as f32 - 2.0);

    let vertical_margin;
    if area.height >= 4 && width <= 1.0 {
        vertical_margin = (area.height - 4) / 2;
    } else {
        txt = format!("\n{}", txt).into();
        vertical_margin = 0;
    }

    Paragraph::new(txt)
        .centered()
        .alignment(Alignment::Center)
        .wrap(Wrap { trim: false })
        .render(
            area.inner(&Margin {
                vertical: vertical_margin,
                horizontal: 1,
            }),
            buf,
        );
}

pub fn render_popup_exit_warning(mut area: Rect, buf: &mut Buffer) {
    area = area.inner(&Margin {
        vertical: 4,
        horizontal: 28,
    });
    Clear.render(area, buf);
    Block::new()
        .style(Style::default().fg(Color::Red).bg(Color::Black))
        .borders(Borders::ALL)
        .render(area, buf);

    let mut txt = translate("exit_warning");
    let width: f32 = 50. / (area.width as f32 - 2.0);

    let vertical_margin;
    if area.height >= 4 && width <= 1.0 {
        vertical_margin = (area.height - 4) / 2;
    } else {
        txt = format!("\n{}", txt).into();
        vertical_margin = 0;
    }

    Paragraph::new(txt)
        .centered()
        .alignment(Alignment::Center)
        .wrap(Wrap { trim: false })
        .render(
            area.inner(&Margin {
                vertical: vertical_margin,
                horizontal: 1,
            }),
            buf,
        );
}
