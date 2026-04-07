#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
火星文转换脚本

用法：
    python3 martian.py "要转换的文字"
    python3 martian.py "要转换的文字" --level 2
    python3 martian.py "要转换的文字" --level 3 --decorate

参数：
    --level 1/2/3/4   转换强度（默认 2）
    --decorate         加符号装饰
"""

import sys
import random
import argparse

# 字符映射表（多备选时随机选）
CHAR_MAP = {
    # 代词
    "我": ["莪", "涐", "俄"],
    "你": ["伱", "沵", "妳"],
    "他": ["怹", "牠"],
    "她": ["婙", "姙"],
    # 虚词
    "的": ["dē", "の", "嘚"],
    "是": ["媞", "昰", "湜"],
    "不": ["卟", "吥"],
    "了": ["樂", "钌"],
    "在": ["洅", "栽"],
    "有": ["冇", "宥", "侑"],
    "和": ["咊", "龢"],
    "就": ["僦"],
    "也": ["嘢", "吔"],
    "都": ["嘟"],
    "还": ["嬛"],
    "很": ["狠", "哏"],
    "又": ["叒"],
    # 动词
    "爱": ["愛", "噯", "嗳"],
    "想": ["缃", "葙"],
    "知": ["釭"],
    "道": ["檤", "噵"],
    "看": ["萪"],
    "听": ["聼"],
    "说": ["説", "詤"],
    "走": ["赱"],
    "笑": ["鎵"],
    "哭": ["渼"],
    "死": ["鉃"],
    "活": ["萿"],
    # 情感
    "心": ["訫", "芯", "鈊", "吢"],
    "情": ["情"],
    "寂": ["鯽"],
    "寞": ["瘼"],
    "孤": ["鈷"],
    "独": ["獨"],
    "伤": ["筗", "殤"],
    "难": ["蘎"],
    "过": ["濄"],
    "眼": ["鴈"],
    "泪": ["涙"],
    "回": ["囙", "廻"],
    "忆": ["憶"],
    "永": ["詠", "氷"],
    "远": ["遠", "逺"],
    "幸": ["圉", "倖"],
    "福": ["鍢"],
    "快": ["筷"],
    "乐": ["砳", "樂"],
    "朋": ["萠"],
    "友": ["囿"],
    "兄": ["鉨"],
    "弟": ["苐"],
    # 时间
    "现": ["哯", "県"],
    "以": ["苡", "已"],
    "前": ["偂"],
    "后": ["逅", "後"],
    "时": ["旹", "时"],
    "间": ["閒", "間"],
    # 形容词
    "美": ["渼", "媺"],
    "丽": ["麗", "丽"],
    "漂": ["髟"],
    "亮": ["煷"],
    "可": ["渴", "渇"],
    "帅": ["衪", "帥"],
    "牛": ["犇"],
    "好": ["恏", "釨"],
    "坏": ["壞"],
    "累": ["纍"],
    "冷": ["玲", "怜"],
    "黑": ["嫼"],
    "白": ["苩", "帛"],
    "今": ["妗"],
    "天": ["兲"],
    "气": ["気"],
    "公": ["叴"],
    "园": ["園"],
    "玩": ["頑"],
    "开": ["開"],
    "永远": ["詠遠"],
    "永": ["詠", "氷"],
}

# 装饰符号
PREFIXES = ["丶", "灬", "╰", "╮", "╭", "ㄣ", "ぶ", "の"]
SUFFIXES = ["_、", "︶ㄣ", "丶", "↘", "★", "☆", "♀", "♂"]
SEPARATORS = ["丶", "ㄝ", "ヾ", "*", "★", "☆", "◆", "◇"]
TAILS = [
    "╮(╯_╰)╭", "o(╯□╰)o", "╮(╯3╰)╭", "(*^_^*)",
    "╰_╯", "⊙﹏⊙", "T_T", "ㄒoㄒ", "QwQ", "QAQ"
]


def convert(text, level=2):
    """按强度转换火星文。

    level 1: ~30% 替换（轻度）
    level 2: ~60% 替换（中度，默认）
    level 3: ~90% 替换（重度）
    level 4: 100% 替换 + 拼音/全角混入（究极）
    """
    if level == 1:
        prob = 0.3
    elif level == 2:
        prob = 0.6
    elif level == 3:
        prob = 0.9
    else:
        prob = 1.0

    result = []
    for ch in text:
        if ch in CHAR_MAP and random.random() < prob:
            result.append(random.choice(CHAR_MAP[ch]))
        else:
            result.append(ch)

    output = "".join(result)

    if level == 4:
        # 究极模式：插入分隔符
        chars = list(output)
        spiced = []
        for i, c in enumerate(chars):
            spiced.append(c)
            if i < len(chars) - 1 and random.random() < 0.25:
                spiced.append(random.choice(SEPARATORS))
        output = "".join(spiced)

    return output


def decorate(text):
    """加装饰：句末小尾巴 + 分隔线"""
    tail = random.choice(TAILS)
    line = "✦━━━━━━━━━━━━━━━━━━━━━✦"
    return f"{line}\n   {text}  {tail}\n{line}"


def make_nickname(core="夜未眠"):
    """生成一个非主流网名"""
    p = random.choice(PREFIXES)
    s = random.choice(SUFFIXES)
    return f"{p}{core}{s}"


def main():
    parser = argparse.ArgumentParser(description="火星文转换器")
    parser.add_argument("text", help="要转换的文字")
    parser.add_argument("--level", type=int, default=2, choices=[1, 2, 3, 4],
                        help="转换强度 1-4（默认 2）")
    parser.add_argument("--decorate", action="store_true", help="添加装饰边框")
    parser.add_argument("--nickname", action="store_true", help="同时生成一个网名")
    args = parser.parse_args()

    output = convert(args.text, args.level)

    if args.decorate:
        output = decorate(output)

    print(output)

    if args.nickname:
        print()
        print(f"配套网名：{make_nickname()}")


if __name__ == "__main__":
    main()
