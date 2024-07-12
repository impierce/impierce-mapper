use crate::{
    popups::{render_popup_exit_warning, render_popup_overwrite_warning},
    state::{translate, AppState, P1Prompts},
    trace_dbg,
};
use ratatui::{
    buffer::Buffer,
    layout::{Constraint, Rect},
    prelude::*,
    widgets::*,
};
use std::path::Path;

pub fn render_description_input_p1(area: Rect, buf: &mut Buffer, state: &mut AppState) {
    // Main title at the top of p1
    Block::new()
        .title("  ELM-OB Mapper  ")
        .title_alignment(Alignment::Center)
        .borders(Borders::TOP)
        .render(area, buf);

    let vertical_sections = Layout::horizontal(vec![Constraint::Length(50), Constraint::Min(0)]);
    let [left, right_prompts] = vertical_sections.areas(area);
    let [languages_area, left_description] =
        Layout::vertical(vec![Constraint::Length(3), Constraint::Min(0)]).areas(left.inner(&Margin {
            vertical: 2,
            horizontal: 0,
        }));

    // Left description area
    Paragraph::new(translate("intro"))
        .wrap(Wrap { trim: true })
        .render(left_description, buf);

    // Right prompts area
    let prompts_area = right_prompts.inner(&Margin {
        vertical: 2,
        horizontal: 1,
    });
    let input_prompts = Layout::vertical(vec![
        Constraint::Length(4),
        Constraint::Length(4),
        Constraint::Length(4),
        Constraint::Length(4),
        Constraint::Length(4),
    ]);
    let [input_path, output_path, mapping_file, mapping, custom_mapping] = input_prompts.areas(prompts_area);

    let mut input_prompt = Block::new()
        .title(format!("  {}  ", translate("input_path")))
        .title_alignment(Alignment::Center)
        .borders(Borders::ALL);
    let mut output_prompt = Block::new()
        .title(format!("  {}  ", translate("output_path")))
        .title_alignment(Alignment::Center)
        .borders(Borders::ALL);
    let mut mapping_prompt = Block::new()
        .title(format!("  {}  ", translate("choose_mapping")))
        .title_alignment(Alignment::Center)
        .borders(Borders::ALL);
    let mut mapping_file_prompt = Block::new()
        .title(format!("  {}  ", translate("choose_mapping_file")))
        .title_alignment(Alignment::Center)
        .borders(Borders::ALL);
    let mut custom_mapping_prompt = Block::new()
        .title(format!("  {}  ", translate("save_custom_mapping")))
        .title_alignment(Alignment::Center)
        .borders(Borders::ALL);
    // Top-left language prompt
    let mut language_prompt = Block::new()
        .title(format!("  {}  ", translate("language_selector")))
        .title_alignment(Alignment::Center)
        .borders(Borders::ALL);

    let active_style = Style::default().fg(Color::LightYellow);
    match state.p1_prompts {
        P1Prompts::Language => language_prompt = language_prompt.style(active_style),
        P1Prompts::Input => input_prompt = input_prompt.style(active_style),
        P1Prompts::Output => output_prompt = output_prompt.style(active_style),
        P1Prompts::Mapping => mapping_prompt = mapping_prompt.style(active_style),
        P1Prompts::MappingFile => mapping_file_prompt = mapping_file_prompt.style(active_style),
        P1Prompts::CustomMapping => custom_mapping_prompt = custom_mapping_prompt.style(active_style),
    };

    // Checking paths for validity/overwriting.
    let path = Path::new(&state.input_path);
    if !path.is_file() {
        Paragraph::new(state.input_path.as_str())
            .block(input_prompt)
            .fg(Color::Red)
            .render(input_path, buf);
    } else {
        Paragraph::new(state.input_path.as_str())
            .block(input_prompt)
            .fg(Color::Green)
            .render(input_path, buf);
    }

    let path = Path::new(&state.output_path);
    if state.output_path.is_empty() {
        Paragraph::new(state.output_path.as_str())
            .block(output_prompt)
            .fg(Color::Red)
            .render(output_path, buf);
    } else if !path.is_file() {
        trace_dbg!(&state.output_path);
        Paragraph::new(state.output_path.as_str())
            .block(output_prompt)
            .fg(Color::Green)
            .render(output_path, buf);
    } else {
        Paragraph::new(state.output_path.as_str())
            .block(output_prompt)
            .fg(Color::Rgb(240, 160, 100))
            .render(output_path, buf);
    }

    let path = Path::new(&state.mapping_path);
    if !path.exists() || !path.is_file() {
        Paragraph::new(state.mapping_path.as_str())
            .block(mapping_file_prompt)
            .fg(Color::Red)
            .render(mapping_file, buf);
    } else {
        Paragraph::new(state.mapping_path.as_str())
            .block(mapping_file_prompt)
            .fg(Color::Green)
            .render(mapping_file, buf);
    }

    // Mapping tabber prompt
    mapping_prompt.render(mapping, buf);
    let mapping_prompt_inner = mapping.inner(&Margin {
        vertical: 1,
        horizontal: 0,
    });

    let tabs = vec![" OBv3 -> ELM ", " ELM -> OBv3 "];
    let [_left, tabs_center, _right] = Layout::horizontal(vec![
        Constraint::Min(1),
        Constraint::Max(tabs.concat().len() as u16 + 2),
        Constraint::Min(1),
    ])
    .areas(mapping_prompt_inner);

    Tabs::new(tabs)
        .style(Style::default().fg(Color::White))
        .highlight_style(Color::Yellow)
        .select(state.mapping as usize)
        .divider("")
        .render(tabs_center, buf);

    // Custom mapping prompt
    let path = Path::new(&state.custom_mapping_path);
    if state.custom_mapping_path.is_empty() {
        Paragraph::new(state.custom_mapping_path.as_str())
            .block(custom_mapping_prompt)
            .fg(Color::White)
            .render(custom_mapping, buf);
    } else if path.is_file() {
        Paragraph::new(state.custom_mapping_path.as_str())
            .block(custom_mapping_prompt)
            .fg(Color::Rgb(240, 160, 100))
            .render(custom_mapping, buf);
    } else {
        Paragraph::new(state.custom_mapping_path.as_str())
            .block(custom_mapping_prompt)
            .fg(Color::Green)
            .render(custom_mapping, buf);
    }

    // Top-left language prompt
    language_prompt.render(languages_area, buf);
    let language_prompt_inner = languages_area.inner(&Margin {
        vertical: 1,
        horizontal: 0,
    });

    let tabs = vec![
        " EN ", " NL ", " BG ", " CS ", " DA ", " DE ", " EL ", " ES ", " ET ", " FI ", " FR ", " HR ", " HU ", " IS ",
        " IT ", " LT ", " LV ", " PL ", " PT ", " RO ", " RU ", " SK ", " SL ", " SV ",
    ];

    let [_left, tabs_center, _right] = Layout::horizontal(vec![
        Constraint::Min(1),
        Constraint::Max(tabs.concat().len() as u16 + 2),
        Constraint::Min(1),
    ])
    .areas(language_prompt_inner);

    if state.language as usize >= tabs_center.width as usize / 6 {
        let tabs_slice =
            &tabs[(state.language as usize - (tabs_center.width as usize / 6) + 1)..state.language as usize + 1];
        let tabs_vec: Vec<String> = tabs_slice.iter().map(|s| s.to_string()).collect();

        let selected_tab = if tabs_center.width / 6 < 1 {
            0
        } else {
            tabs_center.width as usize / 6 - 1
        };

        Tabs::new(tabs_vec)
            .style(Style::default().fg(Color::White))
            .highlight_style(Color::Yellow)
            .select(selected_tab)
            .divider("")
            .render(tabs_center, buf);
    } else {
        Tabs::new(tabs)
            .style(Style::default().fg(Color::White))
            .highlight_style(Color::Yellow)
            .select(state.language as usize)
            .divider("")
            .render(tabs_center, buf);
    }

    // Render warning popup at the end so it doesnt get overwritten by previous renders.
    if state.overwrite_warning {
        render_popup_overwrite_warning(area, buf);
    }
    // Render warning if user wants to exit.
    if state.exit_warning {
        render_popup_exit_warning(area, buf);
    }
}
