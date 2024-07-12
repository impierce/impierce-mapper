pub mod mapping_bars;
pub mod p1;
pub mod p2;
pub mod p3;
pub mod p4;
pub mod popups;

use p1::render_description_input_p1;
use p2::render_manual_mapping_p2;
use p3::render_lost_data_p3;
use p4::render_end_p4;
use ratatui::prelude::*;
use ratatui::{
    buffer::Buffer,
    layout::{Constraint, Rect},
    widgets::{Block, Clear},
};

use crate::state::{translate, AppState, Pages};

pub fn render_page(frame: &mut Frame, area: Rect, state: &mut AppState) {
    let [top, bottom_area] = Layout::vertical(vec![Constraint::Min(0), Constraint::Length(1)]).areas(area);

    match state.page {
        Pages::InputPromptsP1 => render_description_input_p1(top, frame.buffer_mut(), state),
        Pages::ManualMappingP2 => render_manual_mapping_p2(top, frame.buffer_mut(), state),
        Pages::UnusedDataP3 => render_lost_data_p3(top, frame.buffer_mut(), state),
        Pages::EndP4 => render_end_p4(top, frame.buffer_mut(), state),
    }

    // Extra layout for the prev page & finish button
    let complete_len = format!(" {} ", translate("complete")).chars().count() as u16;

    let [prev_button, _rest, complete_button] = Layout::horizontal(vec![
        Constraint::Length(3),
        Constraint::Percentage(100),
        Constraint::Length(complete_len),
    ])
    .areas(top);
    let [prev_button, _rest] = Layout::vertical(vec![Constraint::Length(1), Constraint::Min(0)]).areas(prev_button);
    let [complete_button, _rest] =
        Layout::vertical(vec![Constraint::Length(1), Constraint::Min(0)]).areas(complete_button);

    if state.page != Pages::InputPromptsP1 {
        state.prev_page_button = prev_button;
        render_prev_page_button(prev_button, frame.buffer_mut());
    }
    state.complete_button = complete_button;
    render_complete_button(complete_button, frame.buffer_mut());

    render_bottom_bar(bottom_area, frame.buffer_mut());
}

fn render_bottom_bar(area: Rect, buf: &mut Buffer) {
    let vertical_sections = Layout::horizontal(vec![Constraint::Length(23), Constraint::Min(0)]);
    let [left, right] = vertical_sections.areas(area);

    Block::new()
        .title("  Impierce Technologies ")
        .title_alignment(Alignment::Left)
        .title_style(style::Color::Blue)
        .bg(Color::Black)
        .render(left, buf);

    let keys = [
        ("←↓↑→", translate("navigate")),
        ("Tab", translate("next_field")),
        ("F2", translate("prev_field")),
        ("Enter", translate("save")),
        ("Esc", translate("quit")),
    ];

    let spans: Vec<Span> = keys
        .iter()
        .flat_map(|(key, desc)| {
            let key = Span::styled(
                format!(" {key} "),
                Style::default().on_black().add_modifier(Modifier::BOLD),
            );
            let desc = Span::styled(format!(" {desc} "), Style::default().on_dark_gray());
            [key, desc]
        })
        .collect();
    Line::from(spans)
        .centered()
        .style((Color::Black, Color::Black))
        .render(right, buf);
}

fn render_prev_page_button(area: Rect, buf: &mut Buffer) {
    Block::default()
        .title(" ← ")
        .style(Style::default().bg(Color::DarkGray).add_modifier(Modifier::BOLD))
        .title_alignment(Alignment::Center)
        .render(area, buf);
}

fn render_complete_button(area: Rect, buf: &mut Buffer) {
    Clear.render(area, buf);
    Block::default()
        .title(format!(" {} ", translate("complete")))
        .style(Style::default().bg(Color::DarkGray).add_modifier(Modifier::BOLD))
        .title_alignment(Alignment::Center)
        .render(area, buf);
}
